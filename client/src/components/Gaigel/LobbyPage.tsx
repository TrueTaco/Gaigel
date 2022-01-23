import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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

interface Props {
    backToLogin: () => void;
    playerNames: string[];
    getReady: () => void;
}

const LobbyPage: React.FC<Props> = ({ backToLogin, playerNames, getReady }) => {
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
                {playerNames.map((playerName) => {
                    console.log(playerName);
                    let randomNumber = Math.floor(Math.random() * 3);
                    let winString = "Siege";
                    if (randomNumber === 1) winString = "Sieg";
                    return (
                        <Box className={classes.playerInformation}>
                            <Typography>{playerName}</Typography>
                            <Typography>
                                {randomNumber} {winString}
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
