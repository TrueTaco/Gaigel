import { makeStyles } from "@material-ui/core/styles";

import { Paper, Box, Typography, CardActionArea } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: 40,
        height: 60,
        border: "1px solid #ddd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardActionArea: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
    card: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",
    },
    symbolRow: {
        width: "85%",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
    },
    cardIcons: {
        flex: 1,
        width: 40,
        height: 40,
        resizeMode: "contain",
    },
});

interface Props {
    type: string;
    value: string;
    clickable: boolean;
    playCard?: (type: string, value: string) => void;
    hidden?: boolean;
}

interface Hash {
    [details: string]: string;
}

const GaigelCard: React.FC<Props> = ({ type, value, clickable, playCard, hidden = false }) => {
    const classes = useStyles();
    const symbolMap: Hash = {};
    const iconSize = 10;
    symbolMap["Eichel"] = "/Eichel.png";
    symbolMap["Blatt"] = "/Blatt.png";
    symbolMap["Herz"] = "/Herz.png";
    symbolMap["Schellen"] = "/Bollen.png";

    return (
        <Paper
            className={classes.root}
            onClick={() => {
                if (clickable && typeof playCard !== "undefined") playCard(type, value);
            }}
        >
            <CardActionArea
                className={classes.cardActionArea}
                style={{ pointerEvents: clickable ? "auto" : "none" }}
            >
                {hidden && value !== "" ? (
                    <img
                        src={"/cardBacksite_noSpaceAround.png"}
                        width={"40"}
                        height={"60"}
                        alt=""
                    />
                ) : (
                    value !== "" && (
                        <Box className={classes.card}>
                            <Box className={classes.symbolRow}>
                                <img
                                    src={symbolMap[type]}
                                    width={iconSize}
                                    height={iconSize}
                                    alt=""
                                />
                                <img
                                    src={symbolMap[type]}
                                    width={iconSize}
                                    height={iconSize}
                                    alt=""
                                />
                            </Box>
                            <Typography align="center">{value}</Typography>
                            <Box className={classes.symbolRow}>
                                <img
                                    src={symbolMap[type]}
                                    width={iconSize}
                                    height={iconSize}
                                    alt=""
                                />
                                <img
                                    src={symbolMap[type]}
                                    width={iconSize}
                                    height={iconSize}
                                    alt=""
                                />
                            </Box>
                        </Box>
                    )
                )}
            </CardActionArea>
        </Paper>
    );
};

export default GaigelCard;
