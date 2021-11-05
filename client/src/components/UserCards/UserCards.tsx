import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import GaigelCard from "../../components/GaigelCard/GaigelCard";

const useStyles = makeStyles({
    root: {
        margin: 10,
        marginTop: 150,
    },
});

interface Props {}

interface CardProps {
    type: string;
    value: string;
}

const UserCards: React.FC<Props> = () => {
    const classes = useStyles();
    const [cards, setCards] = useState<CardProps[]>([
        {
            type: "Herz",
            value: "Ass",
        },
        {
            type: "Bollen",
            value: "Sieben",
        },
        {
            type: "Eichel",
            value: "König",
        },
        {
            type: "Herz",
            value: "Ober",
        },
        {
            type: "Blatt",
            value: "Zehn",
        },
    ]);

    return (
        <Grid className={classes.root} container spacing={2} justifyContent="center">
            {cards.map((card) => (
                <Grid item>
                    <GaigelCard type={card.type} value={card.value} />
                </Grid>
            ))}
        </Grid>
    );
};

export default UserCards;
