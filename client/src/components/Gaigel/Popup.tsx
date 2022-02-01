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
        // -------- Warnings --------
        case "falsePlayercount":
            message =
                "Mit dieser Anzahl an Spielern lässt sich kein Spiel starten. Für ein Spiel werden 2, 3, 4 oder 6 Spieler benötigt.";
            break;
        case "notYourTurn":
            message = "Sie sind nicht an der Reihe und können daher jetzt keine Karte spielen.";
            break;
        // TODO: Das hier muss noch implementiert werden (Karte muss dann geblockt werden)
        case "noOpeningChosen":
            message = "Sie müssen eine Eröffnung auswählen, bevor Sie eine Karte spielen können.";
            break;
        case "noAce":
            message = "Sie haben kein Ass. Sie können dieses Opening nicht spielen.";
            break;
        case "noAceButAceOpening":
            message =
                "Sie haben eine Eröffnung gewählt, bei welcher als erste Karte ein Ass gespielt werden muss.";
            break;
        case "aceOrTrumpInHöherHat":
            message =
                "Sie haben eine Eröffnung gewählt, bei welcher kein Ass und kein Trumpf als erste Karte gespielt werden darf.";
            break;
        // -------- Infos --------
        // TODO: Das hier muss auch noch implementiert werden (Iwie muss der Spielername hier landen dann)
        case "somebodyWon":
            message = "XY hat den Stich gewonnen.";
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
