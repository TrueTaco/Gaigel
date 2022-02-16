import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
    },
    element: {
        fontWeight: "lighter",
    },
});

interface Props {
    username: string;
    lobbycode: string;
    score: number;
}

const GameInformation: React.FC<Props> = ({ username, lobbycode, score }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography className={classes.element}>{username}</Typography>
            <Typography className={classes.element}>{score}</Typography>
            <Typography className={classes.element}>{lobbycode}</Typography>
        </Box>
    );
};

export default GameInformation;
