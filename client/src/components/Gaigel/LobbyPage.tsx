import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Header from "./Header";

// TODO:
// TODO:

const useStyles = makeStyles({
    root: {
        maxWidth: "420px",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        boxShadow: "5px 5px 15px black",
    },
    control: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playerList: {
        marginBottom: 10,
        padding: 20,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
    },
    playerInformation: {
        display: "flex",
        justifyContent: "space-between",
    },
    playerElement: {
        fontWeight: "lighter",
    },
    readyInformation: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    },
    readyButton: {
        width: "40%",
    },
});

interface PlayerProps {
    username: string;
    wins: number;
}
interface Props {
    backToLogin: () => void;
    lobbycode: string;
    playerInformation: PlayerProps[];
    amountReadyPlayers: number;
    getReady: () => void;
}

const LobbyPage: React.FC<Props> = ({
    backToLogin,
    lobbycode,
    playerInformation,
    amountReadyPlayers,
    getReady,
}) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Header />
            <hr />

            <Box className={classes.control}>
                <IconButton onClick={backToLogin}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography>Lobbycode: {lobbycode}</Typography>
            </Box>

            <Box className={classes.playerList}>
                <Typography align="center" variant="h6" style={{ fontWeight: "lighter" }}>
                    Spielerliste
                </Typography>
                {playerInformation.map((player) => {
                    let winString;
                    if (player.wins === 1) winString = "Sieg";
                    else winString = "Siege";
                    let key = Math.random();
                    return (
                        <Box className={classes.playerInformation} key={key}>
                            <Typography className={classes.playerElement}>
                                {player.username}
                            </Typography>
                            <Typography
                                className={classes.playerElement}
                                style={{ marginLeft: 10 }}
                            >
                                {player.wins} {winString}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <Box className={classes.readyInformation}>
                <Typography>
                    Bereit: {amountReadyPlayers} / {playerInformation.length}
                </Typography>
                <Button className={classes.readyButton} variant="contained" onClick={getReady}>
                    Bereit
                </Button>
            </Box>
        </Box>
    );
};

export default LobbyPage;
