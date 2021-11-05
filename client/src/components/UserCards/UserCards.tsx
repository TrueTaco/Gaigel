import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import GaigelCard from "../../components/GaigelCard/GaigelCard";

const useStyles = makeStyles({
    root: {},
});

interface Props {
    userCards: CardProps[];
}

interface CardProps {
    type: string;
    value: string;
}

const UserCards: React.FC<Props> = ({ userCards }) => {
    const classes = useStyles();
    const [cards, setCards] = useState<CardProps[]>(userCards);
    let i: number = 0;

    return (
        <Grid className={classes.root} container spacing={2} justifyContent="center">
            {cards.map((card) => {
                i++;
                return (
                    <Grid item key={i}>
                        <GaigelCard type={card.type} value={card.value} clickable={true} />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default UserCards;
