import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
    root: {
        width: 75,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardActionArea: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
});

interface Props {
    type: string;
    value: string;
    clickable: boolean;
}

const GaigelCard: React.FC<Props> = ({ type, value, clickable }) => {
    const classes = useStyles();

    return (
        <Paper
            className={classes.root}
            style={{ border: type === "" ? "1px dashed lightgrey" : "" }}
            onClick={() => {
                if (clickable) console.log(type + " " + value + " legen");
            }}
        >
            <CardActionArea
                className={classes.cardActionArea}
                style={{ pointerEvents: clickable ? "auto" : "none" }}
            >
                <Box>
                    <Typography>{type}</Typography>
                    <Typography>{value}</Typography>
                </Box>
            </CardActionArea>
        </Paper>
    );
};

export default GaigelCard;
