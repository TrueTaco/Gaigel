import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import GaigelCard from "./GaigelCard";

const useStyles = makeStyles({
    root: {
        marginTop: 10,
    },
    header: {
        marginBottom: 10,
    },
});

interface Props {
    userCards: CardProps[];
    playCard: (type: string, value: string) => void;
}

interface CardProps {
    type: string;
    value: string;
}

const YourCards: React.FC<Props> = ({ userCards, playCard }) => {
    const classes = useStyles();
    let i: number = 0;

    return (
        <Grid container className={classes.root} justifyContent="center">
            <Typography className={classes.header}>Deine Karten</Typography>

            <Grid container spacing={2} justifyContent="center">
                {userCards.map((card) => {
                    i++;
                    return (
                        <Grid item key={i}>
                            <GaigelCard
                                type={card.type}
                                value={card.value}
                                clickable={true}
                                playCard={playCard}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
};

export default YourCards;
