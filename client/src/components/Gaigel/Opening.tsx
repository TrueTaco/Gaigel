import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box, ButtonGroup, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: 10,
        alignContent: "center",
        justifyContent: "space-around",
        padding: 10,
        backgroundColor: "#575757",
        border: "5px solid #303030",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    },
    header: {
        marginBottom: 10,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
        color: "white",
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
            <ButtonGroup>
                <Button variant="contained" size="small" onClick={handleAndereAlteHat}>
                    Andere Alte hat
                </Button>
                <Button variant="contained" size="small" onClick={handleGeElfen}>
                    Ge-Elfen
                </Button>
                <Button variant="contained" size="small" onClick={handleHöherHat}>
                    Höher hat
                </Button>
                <Button variant="contained" size="small" onClick={handleAufDissle}>
                    Auf Dissle
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default Opening;
