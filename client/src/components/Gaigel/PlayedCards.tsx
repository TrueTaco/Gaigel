import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import GaigelCard from "./GaigelCard";

const useStyles = makeStyles({
    root: {
        marginTop: 100,
    },
    header: {
        marginBottom: 10,
    },
});

interface Props {
    playedCards: CardProps[];
    playerCount: number;
}

interface CardProps {
    type: string;
    value: string;
}

const PlayedCards: React.FC<Props> = ({ playedCards, playerCount }) => {
    const classes = useStyles();
    let i: number = 0;

    const [cards, setCards] = useState<CardProps[]>(
        new Array(playerCount).fill({ type: "", value: "" })
    );

    useEffect(() => {
        let tempCards: CardProps[] = playedCards;
        for (let i = playedCards.length; i < playerCount; i++) {
            tempCards.push({ type: "", value: "" });
        }
        setCards(tempCards);
    }, [playedCards, playerCount]);

    return (
        <Grid container justifyContent="center" className={classes.root}>
            <Typography className={classes.header}>Gespielte Karten</Typography>

            <Grid container spacing={2} justifyContent="center">
                {cards.map((card) => {
                    i++;
                    return (
                        <Grid item key={i}>
                            <GaigelCard type={card.type} value={card.value} clickable={false} />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default PlayedCards;
