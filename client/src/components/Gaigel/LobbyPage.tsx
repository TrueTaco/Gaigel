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
    },
    playerList: {
        padding: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "10px",
    },
});

interface Props {
    backToLogin: () => void;
    playerNames: string[];
}

const LobbyPage: React.FC<Props> = ({ backToLogin, playerNames }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.control}>
                <IconButton onClick={backToLogin}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <Box className={classes.playerList}>
                {playerNames.map((playerName) => {
                    console.log(playerName);
                    return <Typography>{playerName}</Typography>;
                })}
            </Box>
        </Box>
    );
};

export default LobbyPage;
