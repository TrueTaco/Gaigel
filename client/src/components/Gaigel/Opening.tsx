import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box, ButtonGroup, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        padding: 10,
        backgroundColor: "#575757",
        border: "5px solid #303030",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        flex: "flex-grow",
        gap: "10px",
    },
    header: {
        marginBottom: 10,
        textAlign: "center",
        color: "white",
    },
    buttongroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        flex: "flex-grow",
    },
    button: {
        paddingLeft: 15,
        paddingRight: 15,
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
            <Box className={classes.buttongroup}>
                <ButtonGroup orientation="vertical">
                    <Button variant="contained" size="small" onClick={handleAndereAlteHat}>
                        Andere Alte
                    </Button>
                    <Button variant="contained" size="small" onClick={handleGeElfen}>
                        Ge-Elfen
                    </Button>
                </ButtonGroup>
                <ButtonGroup orientation="vertical">
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
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default Opening;
