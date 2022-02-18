import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box, ButtonGroup, IconButton, Typography } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useState } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
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
        justifyContent: "flex-start",
        flexDirection: "row",
        gap: "30px",
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
    },
});

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
                <Typography className={classes.header}> Eröffnung</Typography>
                <IconButton>
                    <HelpOutlineIcon onClick={handleClick} color="action" />
                </IconButton>
            </Box>

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
