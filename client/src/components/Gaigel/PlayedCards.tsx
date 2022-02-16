import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography } from "@material-ui/core";

import GaigelCard from "./GaigelCard";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    header: {
        fontWeight: "lighter",
    },
});

interface Props {
    playedCards: CardProps[];
    playerCount: number;
    opening: string;
}

interface CardProps {
    type: string;
    value: string;
}

const PlayedCards: React.FC<Props> = ({ playedCards, playerCount, opening }) => {
    const classes = useStyles();
    let i: number = 0;
    let hidden: boolean = opening === "AndereAlteHat" || opening === "HöherHat";

    const [cards, setCards] = useState<CardProps[]>(
        new Array(playerCount).fill({ type: "", value: "" })
    );

    useEffect(() => {
        let tempCards: CardProps[] = playedCards.slice();
        for (let i = playedCards.length; i < playerCount; i++) {
            tempCards.push({ type: "", value: "" });
        }
        setCards(tempCards);
    }, [playedCards, playerCount]);

    return (
        <Box className={classes.root}>
            <Typography className={classes.header}>Gespielte Karten</Typography>

            <Grid container spacing={1} justifyContent="center">
                {cards.map((card) => {
                    i++;
                    return (
                        <Grid item key={i}>
                            <GaigelCard
                                type={card.type}
                                value={card.value}
                                clickable={false}
                                hidden={hidden}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default PlayedCards;
