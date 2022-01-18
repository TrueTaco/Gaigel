// MARK: Imports
import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import LandingPage from "./LandingPage";
import Talon from "./Talon";
import TrumpCard from "./TrumpCard";
import PlayedCards from "./PlayedCards";
import YourCards from "./YourCards";
import Control from "./Control";

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

    // Boolean for deciding on whether to show the landing page or the game
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
    const [yourCards, setYourCards] = useState<CardProps[]>(
        new Array(0).fill({ type: "", value: "" })
    );

    const login = () => {
        setLoggedIn(true);
    };

    // MARK: playCard
    const playCard = (type: string, value: string) => {
        // The array of played cards is filled up with empty entries in PlayingField.tsx in order to make empty GaigelCards
        // For some reason those also append to playedCards
        // Therefore they need to be filtered out
        let actualPlayedCards: CardProps[] = playedCards.filter(
            (card) => card.type !== "" && card.value !== ""
        );
        if (actualPlayedCards.length < playerCount) {
            let playedCardIndex: number = yourCards.findIndex((card) => {
                return card.type === type && card.value === value;
            });
            setYourCards(yourCards.filter((card, index) => index !== playedCardIndex));

            setPlayedCards(() => [...actualPlayedCards, { type: type, value: value }]);

            let playedCard: CardProps = { type: type, value: value };
            // @ts-ignore
            socket.emit("playCard", playedCard);
        }
    };

    const beginGame = () => {
        console.log("Game begins");
        // @ts-ignore
        socket.emit("gameBegin", "");
    };

    const drawCard = () => {
        console.log("Want to draw card");
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

        newSocket.on("setYourCards", (data: any) => {
            console.log("Your cards set");
            setYourCards(data);
        });

        newSocket.on("setPlayedCards", (data: any) => {
            console.log("Played cards set");
            setPlayedCards(data);
        });

        newSocket.on("template", (data: string) => {
            // DO NOT use states (in most cases)
            // DO use "data"
        });

        return () => newSocket.close();
    }, [setSocket]);

    // MARK: Return
    // <Typography>|{response}|</Typography>
    return (
        <Grid
            className={classes.root}
            justifyContent="center"
            alignContent="space-around"
            container
        >
            {!loggedIn ? (
                <LandingPage login={login} />
            ) : (
                <>
                    <Control beginGame={beginGame}></Control>

                    <Grid justifyContent="center" alignItems="center" container>
                        <Talon cardsLeft={talonCards.length} drawCard={drawCard} />
                        <TrumpCard trumpCard={trumpCard} />
                    </Grid>
                    <PlayedCards playedCards={playedCards} playerCount={playerCount} />
                    <YourCards userCards={yourCards} playCard={playCard} />
                </>
            )}
        </Grid>
    );
};

export default Gaigel;
