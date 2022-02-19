import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: "10px",
    },
    element: {
        fontWeight: "lighter",
        width: "50%",
    },
    score: {
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
            <Typography variant="subtitle2" className={classes.element}>
                {username}
            </Typography>
            <Typography variant="h6" className={classes.score}>
                {score}
            </Typography>
            <Typography variant="subtitle2" className={classes.element} align="right">
                {lobbycode}
            </Typography>
        </Box>
    );
};

export default GameInformation;
