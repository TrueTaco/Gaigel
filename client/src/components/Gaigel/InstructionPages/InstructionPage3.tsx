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

const InstructionPage3: React.FC<Props> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box className={classes.root}>
            <Typography variant={matches ? "h5" : "h6"} style={{ fontWeight: "lighter" }}>
                Besondere Regeln
            </Typography>

            <Box className={classes.paragraph}>
                <Typography
                    variant={matches ? "h6" : "body1"}
                    style={{ fontWeight: "normal", width: "100%" }}
                >
                    Melden
                </Typography>
                <Typography align="justify" variant={matches ? "body1" : "body2"}>
                    Besitzt ein Spieler sowohl den Ober als auch den König derselben Farbe, so kann
                    er dieses Paar melden. Für ein normales Paar gibt es 20 und für ein Paar in
                    Trumpffarbe 40 Punkte. Gemeldet werden kann nur, wenn der Spieler zuvor einen
                    Stich gemacht hat und nun die nächste Runde beginnen kann. In dieser nächsten
                    Runde muss eine der beiden gemeldeten Karten gespielt werden.
                </Typography>
            </Box>

            <Box className={classes.paragraph}>
                <Typography
                    variant={matches ? "h6" : "body1"}
                    style={{ fontWeight: "normal", width: "100%" }}
                >
                    Rauben
                </Typography>
                <Typography align="justify" variant={matches ? "body1" : "body2"}>
                    Besitzt ein Spieler die Trumpf Sieben, so kann diese gegen die Karte getauscht
                    werden, die zu Beginn des Spiels als Trumpfkarte gewählt wurde. Geraubt werden
                    kann nur, wenn der Spieler zuvor einen Stich gemacht hat und nun die nächste
                    Runde beginnen kann.
                </Typography>
            </Box>
        </Box>
    );
};

export default InstructionPage3;
