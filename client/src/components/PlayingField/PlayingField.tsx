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
}

interface CardProps {
    type: string;
    value: string;
}

const PlayingField: React.FC<Props> = ({ fieldCards }) => {
    const classes = useStyles();
    let i: number = 0;

    return (
        <Grid className={classes.root} container spacing={2} justifyContent="center">
            {fieldCards.map((card) => {
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
