import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Card, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
    root: {
        zIndex: 50,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "5px 5px 15px black",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: "5px",
    },
    logo: {
        width: "50px",
    },
    rankingHeader: {
        textAlign: "center",
        fontWeight: "lighter",
    },
    rankingContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    rankingElement: {
        display: "flex",
        justifyContent: "space-between",
    },
    rankingElementText: {
        fontWeight: "lighter",
    },
    footer: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: "30px",
    },
});

interface EndPlayerInformation {
    username: string;
    score: number;
}

interface Props {
    endInformation: EndPlayerInformation[];
    backToLobby: () => void;
}

const EndPopup: React.FC<Props> = ({ endInformation, backToLobby }) => {
    const classes = useStyles();

    const [counter, setCounter] = useState<number>(20);

    const decreaseCounter = (newCounter: number) => {
        setCounter(newCounter);

        if (newCounter > 0) {
            setTimeout(() => {
                decreaseCounter(newCounter - 1);
            }, 1000);
        }
    };

    useEffect(() => {
        setCounter(20);
        decreaseCounter(20);
    }, [endInformation]);

    return (
        <Card className={classes.root}>
            <Box className={classes.header}>
                <img src={"/crown.png"} className={classes.logo} />
                <Typography align="center" variant="h4">
                    {endInformation[0].username} hat gewonnen!
                </Typography>
            </Box>

            <hr />

            <Typography className={classes.rankingHeader} variant="h6">
                Platzierungen
            </Typography>

            <Box className={classes.rankingContainer}>
                {endInformation.map((rank, index) => (
                    <Box className={classes.rankingElement}>
                        <Typography className={classes.rankingElementText}>
                            {index + 1}. {rank.username}
                        </Typography>
                        <Typography className={classes.rankingElementText}>
                            {rank.score} Punkte
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box className={classes.footer}>
                <Button startIcon={<ArrowBackIcon />} variant="contained" onClick={backToLobby}>
                    Lobby
                </Button>
                <Typography align="right" noWrap={true}>
                    Nächste Runde in <b>{counter}</b>
                </Typography>
            </Box>
        </Card>
    );
};

export default EndPopup;
