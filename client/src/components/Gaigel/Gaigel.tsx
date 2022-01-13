// MARK: Imports
import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Talon from "../../components/Talon/Talon";
import TrumpCard from "../../components/TrumpCard/TrumpCard";
import PlayingField from "../../components/PlayingField/PlayingField";
import UserCards from "../../components/UserCards/UserCards";
import Control from "../Control/Control";
import { Container } from "@material-ui/core";

// MARK: Styles
const useStyles = makeStyles({
    root: {
        margin: 10,
        marginTop: 50,
    },
});

interface Props {}

interface CardProps {
    type: string;
    value: string;
}

const Gaigel: React.FC<Props> = () => {
    // MARK: States
    const classes = useStyles();

    // Latest response from server (For debugging purposes)
    const [response, setResponse] = useState("");
    const [socket, setSocket] = useState(null);

    // Amount of players that are currently playing
    const [playerCount, setPlayerCount] = useState<number>(4);

    // The cards that can still be drawn from the talon
    const [talonCards, setTalonCards] = useState<CardProps[]>(
        new Array(0).fill({ type: "", value: "" })
    );

    // The trump card
    const [trumpCard, setTrumpCard] = useState<CardProps>({ type: "", value: "" });

    // The cards that are currently being played
    const [playedCards, setPlayedCards] = useState<CardProps[]>([]);

    // The cards that the user currently has
    const [userCards, setUserCards] = useState<CardProps[]>(
        new Array(0).fill({ type: "", value: "" })
    );

    // MARK: playCard
    const playCard = (type: string, value: string) => {
        // The array of played cards is filled up with empty entries in PlayingField.tsx in order to make empty GaigelCards
        // For some reason those also append to playedCards
        // Therefore they need to be filtered out
        let actualPlayedCards: CardProps[] = playedCards.filter(
            (card) => card.type !== "" && card.value !== ""
        );
        if (actualPlayedCards.length < playerCount) {
            let playedCardIndex: number = userCards.findIndex((card) => {
                return card.type === type && card.value === value;
            });
            setUserCards(userCards.filter((card, index) => index !== playedCardIndex));

            setPlayedCards(() => [...actualPlayedCards, { type: type, value: value }]);
        }
    };

    const beginGame = () => {
        console.log("Game begins");
        // @ts-ignore
        socket.emit("gameBegin", "");
    };

    // MARK: useEffect
    useEffect(() => {
        console.log("UseEffect 1 was called");
        // @ts-ignore
        setSocket(socket);
    }, []);

    // @ts-ignore
    useEffect(() => {
        const newSocket = socketIOClient("http://127.0.0.1:5000");
        // @ts-ignore
        setSocket(newSocket);

        newSocket.on("onConnect", (data: string) => {
            setResponse(data);
        });

        newSocket.on("setTalon", (data: any) => {
            console.log("Talon set");
            setTalonCards(data);
        });

        newSocket.on("setTrumpCard", (data: any) => {
            console.log("Trumpcard set");
            setTrumpCard(data);
        });

        newSocket.on("setCards", (data: any) => {
            console.log("Playercards set");
            setUserCards(data);
        });

        newSocket.on("template", (data: string) => {
            // DO NOT use states (in most cases)
            // DO use "data"
        });

        return () => newSocket.close();
    }, [setSocket]);

    // MARK: Legacy functions
    const createTalon = () => {
        let types: string[] = ["Eichel", "Blatt", "Herz", "Schellen"];
        // let types: string[] = ["Eichel"];
        let values: string[] = ["7", "U", "O", "K", "10", "A"];
        let newTalon: CardProps[] = [];

        types.forEach((type) =>
            values.forEach((value) => {
                newTalon.push({ type: type, value: value });
            })
        );

        newTalon.push(...newTalon);
        fisherYatesShuffle(newTalon);

        setTalonCards(newTalon);
    };

    // Reliable shuffling algorithm
    // Source: https://www.delftstack.com/de/howto/javascript/shuffle-array-javascript/
    const fisherYatesShuffle = (arr: CardProps[]) => {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    };

    const drawCard = (amount: number) => {
        if (userCards.length < 5 && talonCards.length > 0) {
            // Gets last cards of the talon array and removes them
            let drawnCards: CardProps[] = talonCards.slice(talonCards.length - amount);
            setTalonCards(talonCards.slice(0, talonCards.length - amount));

            let newUserCards: CardProps[] = userCards;
            drawnCards.forEach((card) => {
                newUserCards.push(card);
            });

            newUserCards.sort((a, b): number => {
                const points = new Map();
                points.set("7", 0);
                points.set("U", 2);
                points.set("O", 3);
                points.set("K", 4);
                points.set("10", 10);
                points.set("A", 11);
                if (points.get(a.value) < points.get(b.value)) {
                    return -1;
                }
                if (points.get(a.value) > points.get(b.value)) {
                    return 1;
                } else {
                    return 0;
                }
            });

            newUserCards.sort((a, b): number => {
                //"Eichel", "Blatt", "Herz", "Schellen"
                const trump = new Map();
                trump.set("Eichel", 0);
                trump.set("Blatt", 1);
                trump.set("Herz", 2);
                trump.set("Schellen", 3);

                if (trumpCard.type === a.type || trumpCard.type === b.type) {
                    trump.set(trumpCard.type, 5);
                }

                if (trump.get(a.value) < trump.get(b.value)) {
                    return -1;
                }
                if (trump.get(a.value) > trump.get(b.value)) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // Gives drawn cards to player
            setUserCards(newUserCards);
        }
    };

    const chooseTrumpCard = () => {
        let newTrumpCard: CardProps = talonCards[talonCards.length - 1];
        setTalonCards(talonCards.slice(0, talonCards.length - 1));

        setTrumpCard(newTrumpCard);
    };

    // MARK: Return
    // <Typography>|{response}|</Typography>
    return (
        <Grid
            className={classes.root}
            justifyContent="center"
            alignContent="space-around"
            container
        >
            <Control beginGame={beginGame}></Control>

            <Grid justifyContent="center" alignItems="center" container>
                <Talon cardsLeft={talonCards.length} drawCard={drawCard} />
                <TrumpCard trumpCard={trumpCard} />
            </Grid>
            <PlayingField playedCards={playedCards} playerCount={playerCount} />
            <UserCards userCards={userCards} playCard={playCard} />
        </Grid>
    );
};

export default Gaigel;
