import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignContent: "center",
            alignItems: "center",
            gap: "20px",
        },
        listContainer: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: "5px",
        },
        listItem: {
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
            alignItems: "center",
        },
        listItemText: {
            width: "40%",
            fontWeight: "normal",
        },
    })
);

interface CardInfoProps {
    name: string;
    value: number;
}

interface Props {}

const FirstInstructionPage: React.FC<Props> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const cardInfo: CardInfoProps[] = [
        {
            name: "Ass",
            value: 11,
        },
        {
            name: "Zehn",
            value: 10,
        },
        {
            name: "König",
            value: 4,
        },
        {
            name: "Ober",
            value: 3,
        },
        {
            name: "Unter",
            value: 2,
        },
        {
            name: "Sieben",
            value: 0,
        },
    ];

    return (
        <Box className={classes.root}>
            <Typography variant={matches ? "h5" : "h6"} style={{ fontWeight: "lighter" }}>
                Grundlegendes
            </Typography>
            <Typography align="justify" variant={matches ? "body1" : "body2"}>
                Gaigel ist ein schwäbisches Kartenspiel, was mit 48 Karten gespielt wird. Die
                Reihenfolge der Karten und die jeweiligen Werte sieht folgendermaßen aus:
            </Typography>

            <Box className={classes.listContainer}>
                {cardInfo.map((card) => {
                    return (
                        <Box className={classes.listItem}>
                            <Typography
                                variant={matches ? "h6" : "body1"}
                                className={classes.listItemText}
                            >
                                {card.name}
                            </Typography>
                            <Typography
                                variant={matches ? "h6" : "body1"}
                                align="right"
                                className={classes.listItemText}
                            >
                                {card.value} Punkte
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            <Typography align="justify" variant={matches ? "body1" : "body2"}>
                Gewonnen hat, wer zuerst eine Punktzahl von mindestens 101 Punkten erreicht, oder,
                wer am Ende, wenn alle Karten ausgespielt wurden, die meisten Punkte gesammelt hat.
                Punkte können gesammelt werden, indem Stiche gewonnen werden. Denn wer einen Stich
                gewinnt, erhält die Summe der Werte aller enthaltenen Karten.
            </Typography>
        </Box>
    );
};

export default FirstInstructionPage;
