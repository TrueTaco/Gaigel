import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box, ButtonGroup, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        flex: "flex-grow",
        gap: "5px",
    },
    header: {
        textAlign: "center",
        fontWeight: "lighter",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: "5px",
    },
    button: {
        fontSize: 10,
    },
});

interface Props {
    GeElfen: () => void;
    AndereAlteHat: () => void;
    HöherHat: () => void;
    AufDissle: () => void;
}

const Opening: React.FC<Props> = ({ GeElfen, AndereAlteHat, HöherHat, AufDissle }) => {
    const classes = useStyles();

    const handleAndereAlteHat = () => {
        AndereAlteHat();
    };

    const handleGeElfen = () => {
        GeElfen();
    };

    const handleHöherHat = () => {
        HöherHat();
    };

    const handleAufDissle = () => {
        AufDissle();
    };

    return (
        <Box className={classes.root}>
            <Typography className={classes.header}> Eröffnung</Typography>
            <Box className={classes.buttonContainer}>
                <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    onClick={handleAndereAlteHat}
                >
                    Andere Alte
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    onClick={handleGeElfen}
                >
                    Ge-Elfen
                </Button>

                <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    onClick={handleHöherHat}
                >
                    Höher hat
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    size="small"
                    onClick={handleAufDissle}
                >
                    Auf Dissle
                </Button>
            </Box>
        </Box>
    );
};

export default Opening;
