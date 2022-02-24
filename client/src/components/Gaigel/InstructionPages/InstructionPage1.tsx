import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { Box, Typography, Card, Button, IconButton, MobileStepper } from "@material-ui/core";

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
        paragraph: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: "5px",
        },
    })
);

interface Props {}

const InstructionPage1: React.FC<Props> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box className={classes.root}>
            <Typography variant={matches ? "h5" : "h6"} style={{ fontWeight: "lighter" }}>
                Spielverlauf
            </Typography>

            <Box className={classes.paragraph}>
                <Typography
                    variant={matches ? "h6" : "body1"}
                    style={{ fontWeight: "normal", width: "100%" }}
                >
                    Stiche
                </Typography>
                <Typography align="justify" variant={matches ? "body1" : "body2"}>
                    Zu Beginn einer regulären Runde spielt die Person, die den letzten Stich
                    gewonnen hat, eine beliebige Karte offen aus. Daraufhin können die anderen
                    Spieler nacheinander Karten hinzulegen. Sobald jeder Spieler eine Karte gelegt
                    hat wird entschieden, wer den Stich gewonnen hat. Gewonnen hat der, der eine
                    Karte mit der gleichen Farbe, wie die der ersten Karte, aber mit einem höheren
                    Wert oder wer den höchsten Trumpf gelegt hat. Wurde keine höhere Karte und kein
                    Trumpf gelegt, so gewinnt der Spieler, der die erste Karte gelegt hat.
                </Typography>
            </Box>

            <Box className={classes.paragraph}>
                <Typography
                    variant={matches ? "h6" : "body1"}
                    style={{ fontWeight: "normal", width: "100%" }}
                >
                    Bedienen
                </Typography>
                <Typography align="justify" variant={matches ? "body1" : "body2"}>
                    Sobald der Talon leer ist, also keine Karten mehr zum Nachziehen vorhanden sind,
                    besteht Bedienpflicht. Wenn man also eine Karte besitzt, die die gleiche Farbe
                    wie die erste Karte des Stiches hat, so muss diese gelegt werden.
                </Typography>
            </Box>
        </Box>
    );
};

export default InstructionPage1;
