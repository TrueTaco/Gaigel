import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        padding: 10,
        backgroundColor: "#575757",
        border: "5px solid #303030",
        borderRadius: 20,
        color: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: "10px",
    },
    name: {
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 8,
    },
});

interface Props {
    playerlist: string[];
}

const PlayerList: React.FC<Props> = ({ playerlist }) => {
    const classes = useStyles();

    // TODO: Replace the random highlighting with the actual player whose turn it is
    let randomHighlight = Math.floor(Math.random() * playerlist.length * 1);
    let i = -1;

    return (
        <Box className={classes.root}>
            {playerlist.map((name) => {
                i++;
                return (
                    <Typography
                        className={classes.name}
                        style={{ border: randomHighlight === i ? "2px solid #ffe600" : "none" }}
                    >
                        {name}
                    </Typography>
                );
            })}
        </Box>
    );
};

export default PlayerList;
