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
    const [userCards, setUserCards] = useState<CardProps[]>([
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
        <Grid className={classes.root} justifyContent="center" container>
            <Talon />
            <PlayingField fieldCards={userCards} />
            <UserCards userCards={userCards} />
        </Grid>
    );
};

export default Gaigel;
