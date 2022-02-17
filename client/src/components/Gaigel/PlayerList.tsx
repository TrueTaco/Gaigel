import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: "250px",
        maxWidth: "500px",
        borderRadius: 20,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignContent: "center",
        alignItems: "center",
        gap: "5px",
    },
    name: {
        padding: 5,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 8,
        fontWeight: "lighter",
    },
});

interface Props {
    order: string[];
    playerWithTurn: string;
}

const PlayerList: React.FC<Props> = ({ order, playerWithTurn }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {order.map((name, index) => {
                let turn = name === playerWithTurn;
                return (
                    <>
                        <Typography
                            variant="body2"
                            className={classes.name}
                            style={{ border: turn ? "2px solid #ffe600" : "none" }}
                            key={name}
                        >
                            {index + 1}. {name}
                        </Typography>
                        {/* <Typography>›</Typography> */}
                    </>
                );
            })}
        </Box>
    );
};

export default PlayerList;
