import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: 20,
        justifyContent: "space-evenly",
    },
    beginGame: {},
});

interface Props {
    beginGame: () => void;
}

const Control: React.FC<Props> = ({ beginGame }) => {
    const classes = useStyles();

    const handleGameBegin = () => {
        beginGame();
    };

    return (
        <Grid className={classes.root}>
            <Button className={classes.beginGame} variant="contained" onClick={handleGameBegin}>
                Spiel starten
            </Button>
        </Grid>
    );
};

export default Control;
