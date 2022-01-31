import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        color: "white",
    },
});

interface Props {
    username: string;
    lobbycode: string;
}

const GameInformation: React.FC<Props> = ({ username, lobbycode }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography>{username}</Typography>
            <Typography>{lobbycode}</Typography>
        </Box>
    );
};

export default GameInformation;
