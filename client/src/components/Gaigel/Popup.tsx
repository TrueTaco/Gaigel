import { makeStyles } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
    root: {},
});

interface Props {
    snackbarType: string;
    type: string;
    reset: () => void;
}

const Popup: React.FC<Props> = ({ snackbarType, type, reset }) => {
    const classes = useStyles();
    let message = "";

    switch (type) {
        case "noAce":
            message = "Sie haben kein Ass. Sie können dieses Opening nicht spielen.";
            break;
        case "notYourTurn":
            message = "Sie sind nicht an der Reihe. Sie können jetzt keine Karte spielen.";
            break;
        case "falsePlayercount":
            message =
                "Mit dieser Anzahl an Spielern lässt sich kein Spiel starten. Für ein Spiel werden 2, 3, 4 oder 6 Spieler benötigt.";
            break;
        default:
            break;
    }

    return (
        <Snackbar
            open={type !== ""}
            autoHideDuration={4000}
            onClose={reset}
            anchorOrigin={{
                vertical: snackbarType === "warning" ? "bottom" : "top",
                horizontal: "center",
            }}
            transitionDuration={0}
        >
            <Alert onClose={reset} severity={snackbarType === "warning" ? "warning" : "info"}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Popup;
