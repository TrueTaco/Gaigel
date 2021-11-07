import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    cardActionArea: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
    paper: {
        width: 50,
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    counter: {
        marginTop: 10,
    },
});

interface Props {
    cardsLeft: number;
    drawCard: () => void;
}

const Talon: React.FC<Props> = ({ cardsLeft, drawCard }) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.root}>
            <Paper className={classes.paper}>
                <CardActionArea
                    className={classes.cardActionArea}
                    onClick={() => {
                        drawCard();
                    }}
                >
                    <Typography variant="h4" align="center">
                        🃏
                    </Typography>
                </CardActionArea>
            </Paper>
            <Typography className={classes.counter}>Cards left: {cardsLeft}</Typography>
        </Grid>
    );
};

export default Talon;
