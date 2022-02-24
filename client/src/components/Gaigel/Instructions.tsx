import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Box, Typography, Card, Button, IconButton, MobileStepper } from "@material-ui/core";
import { useState } from "react";

import InstructionPage0 from "./InstructionPages/InstructionPage0";
import InstructionPage1 from "./InstructionPages/InstructionPage1";
import InstructionPage2 from "./InstructionPages/InstructionPage2";
import InstructionPage3 from "./InstructionPages/InstructionPage3";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            zIndex: 60,
            width: "100%",
            height: "100%",
            // minWidth: "36ch",
            // maxWidth: "64ch",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            gap: "10px",
            boxShadow: "5px 5px 15px black",
        },
        headerButton: {
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        },
        header: {
            fontWeight: "lighter",
        },
        closeButton: {
            position: "absolute",
            top: "0px",
            right: "0px",
        },
    })
);

interface Props {
    toggleShowInstructions: () => void;
}

const Instructions: React.FC<Props> = ({ toggleShowInstructions }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const amountOfPages: number = 4;
    const [currentPage, setCurrentPage] = useState<number>(0);

    const pageDown = () => {
        let newPage = currentPage - 1 < 0 ? amountOfPages : currentPage - 1;
        setCurrentPage(newPage);
    };

    const pageUp = () => {
        let newPage = currentPage + 1 > amountOfPages ? 0 : currentPage + 1;
        setCurrentPage(newPage);
    };

    return (
        <Card className={classes.root}>
            <Box
                className={classes.headerButton}
                style={matches ? { gap: "20px" } : { gap: "10px" }}
            >
                <IconButton onClick={pageDown}>
                    <ArrowBackIosIcon fontSize={matches ? "large" : "medium"} />
                </IconButton>
                <Typography
                    align="center"
                    variant={matches ? "h4" : "h5"}
                    className={classes.header}
                >
                    Anleitung
                </Typography>
                <IconButton onClick={pageUp}>
                    <ArrowForwardIosIcon fontSize={matches ? "large" : "medium"} />
                </IconButton>
                <IconButton className={classes.closeButton} onClick={toggleShowInstructions}>
                    <CloseIcon fontSize={matches ? "large" : "medium"} />
                </IconButton>
            </Box>

            <hr style={{ width: "100%" }} />

            {currentPage === 0 ? (
                <InstructionPage0 />
            ) : currentPage === 1 ? (
                <InstructionPage1 />
            ) : currentPage === 2 ? (
                <InstructionPage2 openingPage={1} />
            ) : currentPage === 3 ? (
                <InstructionPage2 openingPage={2} />
            ) : (
                <InstructionPage3 />
            )}

            <MobileStepper
                style={{ backgroundColor: "white" }}
                position="static"
                variant="dots"
                steps={amountOfPages + 1}
                activeStep={currentPage}
                backButton={<></>}
                nextButton={<></>}
            ></MobileStepper>
        </Card>
    );
};

export default Instructions;
