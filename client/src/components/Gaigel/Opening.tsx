import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box, ButtonGroup, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        color: "white",
    },
    header: {
        marginBottom: 10,
        textAlign: "center",
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
