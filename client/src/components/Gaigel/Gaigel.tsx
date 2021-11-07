import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Talon from "../../components/Talon/Talon";
import PlayingField from "../../components/PlayingField/PlayingField";
import UserCards from "../../components/UserCards/UserCards";

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
    const classes = useStyles();

    // Amount of players that are currently playing
    const [playerCount, setPlayerCount] = useState<number>(4);

    // The cards that can still be drawn from the talon
    const [talonCards, setTalonCards] = useState<CardProps[]>(
        new Array(48).fill({ type: "", value: "" })
    );

    // The cards that are currently being played
    const [playedCards, setPlayedCards] = useState<CardProps[]>([
        { type: "Herz", value: "U" },
        { type: "Eichel", value: "7" },
    ]);

    // The cards that the user currently has
    const [userCards, setUserCards] = useState<CardProps[]>([
        { type: "Herz", value: "A" },
        { type: "Schellen", value: "7" },
        { type: "Eichel", value: "K" },
        // { type: "Herz", value: "O" },
        { type: "Blatt", value: "10" },
        { type: "Blatt", value: "10" },
    ]);

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

    const drawCard = () => {
        if (userCards.length < 5) {
            setUserCards((userCards) => [...userCards, { type: "Blatt", value: "A" }]);
        }
        console.log(talonCards);
    };

    const createTalon = () => {
        let types: string[] = ["Eichel", "Blatt", "Herz", "Schellen"];
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

    useEffect(() => {
        console.log("UseEffect was called");
        createTalon();
    }, []);

    return (
        <Grid
            className={classes.root}
            justifyContent="center"
            alignContent="space-around"
            container
        >
            <Talon cardsLeft={talonCards.length} drawCard={drawCard} />
            <PlayingField playedCards={playedCards} playerCount={playerCount} />
            <UserCards userCards={userCards} playCard={playCard} />
        </Grid>
    );
};

export default Gaigel;
