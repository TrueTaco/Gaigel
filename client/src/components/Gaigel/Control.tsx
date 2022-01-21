import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
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
        <Box className={classes.root}>
            <Button className={classes.beginGame} variant="contained" onClick={handleGameBegin}>
                Spiel starten
            </Button>
        </Box>
    );
};

export default Control;
