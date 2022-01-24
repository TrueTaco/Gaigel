import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
    root: {
        minWidth: "300px",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
    },
    control: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playerList: {
        padding: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
    },
    playerInformation: {
        display: "flex",
        justifyContent: "space-between",
    },
});

interface PlayerProps {
    username: string;
    wins: number;
}
interface Props {
    backToLogin: () => void;
    playerInformation: PlayerProps[];
    getReady: () => void;
}

const LobbyPage: React.FC<Props> = ({ backToLogin, playerInformation, getReady }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.control}>
                <IconButton onClick={backToLogin}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography>2 / 3 sind bereit</Typography>
            </Box>

            <Box className={classes.playerList}>
                {playerInformation.map((player) => {
                    let winString;
                    if (player.wins === 1) winString = "Sieg";
                    else winString = "Siege";
                    let key = Math.random();
                    return (
                        <Box className={classes.playerInformation} key={key}>
                            <Typography>{player.username}</Typography>
                            <Typography>
                                {player.wins} {winString}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <Button variant="contained" onClick={getReady}>
                Bereit
            </Button>
        </Box>
    );
};

export default LobbyPage;
