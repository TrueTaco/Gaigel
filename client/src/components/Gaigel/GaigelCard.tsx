import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Avatar } from "@material-ui/core";

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
    cardIcons: {
        flex: 1,
        width: 50,
        height: 50,
        resizeMode: "contain",
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
    const iconSize = 13;
    symbolMap["Eichel"] = "/Eichel.png";
    symbolMap["Blatt"] = "/Blatt.png";
    symbolMap["Herz"] = "/Herz.png";
    symbolMap["Schellen"] = "/Bollen.png";

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
                {value !== "" && (
                    <Box>
                        <img src={symbolMap[type]} width={iconSize} height={iconSize} />
                        <img src={"/Blank.jpg"} width={"15"} height={iconSize} />
                        <img src={symbolMap[type]} width={iconSize} height={iconSize} />
                        <Typography align="center">{value}</Typography>
                        <img src={symbolMap[type]} width={iconSize} height={iconSize} />
                        <img src={"/Blank.jpg"} width={"15"} height={iconSize} />
                        <img src={symbolMap[type]} width={iconSize} height={iconSize} />
                    </Box>
                )}
            </CardActionArea>
        </Paper>
    );
};

export default GaigelCard;
