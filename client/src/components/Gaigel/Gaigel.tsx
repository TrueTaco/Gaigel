import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Talon from "../../components/Talon/Talon";
import PlayingField from "../../components/PlayingField/PlayingField";
import UserCards from "../../components/UserCards/UserCards";

const useStyles = makeStyles({
    root: {
        margin: 10,
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
    const [playerCount, setPlayerCount] = useState<number>(3);

    // The cards that can still be drawn from the talon
    const [talonCards, setTalonCards] = useState<CardProps[]>();

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
        { type: "Herz", value: "O" },
        { type: "Blatt", value: "10" },
    ]);

    const playCard = (type: string, value: string) => {
        // The array of played cars is filled up with empty entries in order to make empty GaigelCards
        // For some reason those also append to playedCards
        // Therefore they need to be filtered out
        let actualPlayedCards: CardProps[] = playedCards.filter(
            (card) => card.type !== "" && card.value !== ""
        );
        if (actualPlayedCards.length < playerCount) {
            setUserCards(userCards.filter((card) => !(card.type === type && card.value === value)));
            setPlayedCards(() => [...actualPlayedCards, { type: type, value: value }]);
        }
    };

    const drawCard = () => {
        console.log(playedCards);
        if (userCards.length < 5) {
            setUserCards((userCards) => [...userCards, { type: "Blatt", value: "A" }]);
        }
    };

    return (
        <Grid className={classes.root} justifyContent="center" container>
            <Talon drawCard={drawCard} />
            <PlayingField playedCards={playedCards} playerCount={playerCount} />
            <UserCards userCards={userCards} playCard={playCard} />
        </Grid>
    );
};

export default Gaigel;
