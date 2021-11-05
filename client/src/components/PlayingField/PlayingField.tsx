import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import GaigelCard from "../../components/GaigelCard/GaigelCard";

const useStyles = makeStyles({
    root: {
        margin: 30,
    },
});

interface Props {
    fieldCards: CardProps[];
    playerCount: number;
}

interface CardProps {
    type: string;
    value: string;
}

const PlayingField: React.FC<Props> = ({ fieldCards, playerCount }) => {
    const classes = useStyles();
    let i: number = 0;

    const [cards, setCards] = useState<CardProps[]>(
        new Array(playerCount).fill({ type: "", value: "" })
    );

    useEffect(() => {
        let tempCards: CardProps[] = fieldCards;
        for (let i = fieldCards.length; i < playerCount; i++) {
            tempCards.push({ type: "", value: "" });
        }
        setCards(tempCards);
        console.log(tempCards);
        console.log(fieldCards);
        console.log("K");
    }, [fieldCards, playerCount]);

    return (
        <Grid className={classes.root} container spacing={2} justifyContent="center">
            {cards.map((card) => {
                i++;
                return (
                    <Grid item key={i}>
                        <GaigelCard type={card.type} value={card.value} clickable={false} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default PlayingField;
