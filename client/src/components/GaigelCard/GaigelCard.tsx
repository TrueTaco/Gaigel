import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
    root: {
        width: 50,
        height: 75,
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
    playCard?: (type: string, value: string) => void;
}

interface Hash {
    [details: string]: string;
}

const GaigelCard: React.FC<Props> = ({ type, value, clickable, playCard }) => {
    const classes = useStyles();
    const symbolMap: Hash = {};
    symbolMap["Eichel"] = "♣️";
    symbolMap["Eichel2"] = "♧";
    symbolMap["Blatt"] = "♠️";
    symbolMap["Blatt2"] = "♤";
    symbolMap["Herz"] = "♥️";
    symbolMap["Herz2"] = "♡";
    symbolMap["Schellen"] = "♦️";
    symbolMap["Schellen2"] = "♢";

    return (
        <Paper
            className={classes.root}
            style={{ border: type === "" ? "1px dashed lightgrey" : "" }}
            onClick={() => {
                if (clickable && typeof playCard !== "undefined") playCard(type, value);
            }}
        >
            <CardActionArea
                className={classes.cardActionArea}
                style={{ pointerEvents: clickable ? "auto" : "none" }}
            >
                <Box>
                    <Typography align="center">
                        {symbolMap[type + "2"]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {symbolMap[type]}
                    </Typography>
                    <Typography align="center">{value}</Typography>
                    <Typography align="center">
                        {symbolMap[type]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {symbolMap[type + "2"]}
                    </Typography>
                </Box>
            </CardActionArea>
        </Paper>
    );
};

export default GaigelCard;
