import { makeStyles, Theme, useTheme, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import { Box, IconButton, Typography } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
            flex: "flex-grow",
            gap: "5px",
        },
        header: {
            textAlign: "center",
            fontWeight: "lighter",
        },
        headerBox: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
        },
        instructions: {
            position: "fixed",
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
            [theme.breakpoints.up("md")]: {
                fontSize: 14,
            },
        },
    })
);

interface Props {
    GeElfen: () => void;
    AndereAlteHat: () => void;
    HöherHat: () => void;
    AufDissle: () => void;
    handleClick: () => void;
    hover: boolean;
}

const Opening: React.FC<Props> = ({
    GeElfen,
    AndereAlteHat,
    HöherHat,
    AufDissle,
    handleClick,
    hover,
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

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
            <Box className={classes.headerBox}>
                <HelpOutlineIcon style={{ opacity: "0", width: "50px" }} color="action" />
                <Typography variant={matches ? "h6" : "body1"} className={classes.header}>
                    Eröffnung
                </Typography>
                <IconButton>
                    <HelpOutlineIcon onClick={handleClick} color="action" />
                </IconButton>
            </Box>

            <Box className={classes.buttonContainer}>
                <Button
                    className={classes.button}
                    variant="contained"
                    size={matches ? "medium" : "small"}
                    onClick={handleAndereAlteHat}
                >
                    Andere Alte
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    size={matches ? "medium" : "small"}
                    onClick={handleGeElfen}
                >
                    Ge-Elfen
                </Button>

                <Button
                    className={classes.button}
                    variant="contained"
                    size={matches ? "medium" : "small"}
                    onClick={handleHöherHat}
                >
                    Höher hat
                </Button>
                <Button
                    className={classes.button}
                    variant="contained"
                    size={matches ? "medium" : "small"}
                    onClick={handleAufDissle}
                >
                    Auf Dissle
                </Button>
            </Box>
        </Box>
    );
};

export default Opening;
