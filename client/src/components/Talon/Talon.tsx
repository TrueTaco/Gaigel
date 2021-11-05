import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {},
    cardActionArea: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
    paper: {
        width: 75,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

interface Props {}

const Talon: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <Grid
            item
            onClick={() => {
                console.log("Karte ziehen");
            }}
        >
            <CardActionArea className={classes.cardActionArea}>
                <Paper className={classes.paper}>
                    <Typography align="center">Talon Rückseite</Typography>
                </Paper>
            </CardActionArea>
        </Grid>
    );
};

export default Talon;
