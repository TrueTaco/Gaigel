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
        openingContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: "25px",
        },
        opening: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: "5px",
        },
    })
);

interface Props {
    openingPage: number;
}

const InstructionPage2: React.FC<Props> = ({ openingPage }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    let instructions: string[] = [
        "Bei dieser Eröffnungsmöglichkeit wird ein Ass verdeckt durch die Vorhand gespielt. Alle anderen Spieler spielen nun auch verdeckt jeweils eine Karte. Der Stich gehört dem Spieler, der das gleiche Ass wie die Vorhand gespielt hat. Ist dies nicht der Fall, gehört der Stich der Vorhand.",
        "In dieser Eröffnungsmöglichkeit wird das Ass von der Vorhand offen ausgespielt. Die anderen Spieler können nun eine beliebige Karte offen abwerfen. Der Stich geht dann an den Spielbeginner.",
        "Bei Höher hat wird eine Karte verdeckt ausgespielt, welche weder ein Ass, noch ein Trumpf ist. Auch die anderen Spieler spielen jeweils eine verdeckte Karte aus. Der Stich geht an den Spieler, welcher eine Karte mit der gleichen Farbe, aber mit höherem Wert gelegt hat. Wird keine Karte der gleichen Farbe mit höherem Wert gelegt, so geht der Stich an die Vorhand.",
        "Eine weitere Eröffnungsmöglichkeit ist Dissle. Sagt die Vorhand zu Beginn des Spiels, dass auf Dissle gespielt wird, so gewinnt die Vorhand das Spiel, falls sie im Verlauf des Spiels fünf Siebener gleichzeitig besitzt. Die Gegner können bereits vorher das reguläre Spielende erreichen. Die Vorhand hat das Spiel verloren, wenn sie einen Stich gewinnt.",
    ];
    let instructionTitles: string[] = ["Andere Alte hat", "Ge-Elfen", "Höher hat", "Auf Dissle"];

    return (
        <Box className={classes.root}>
            <Typography variant={matches ? "h5" : "h6"} style={{ fontWeight: "lighter" }}>
                Eröffnungen {openingPage}/2
            </Typography>

            {openingPage === 1 && (
                <Typography align="justify" variant={matches ? "body1" : "body2"}>
                    Bei Gaigel kann die Vorhand, also die Person, die am Anfang der Runde als Erste
                    ausspielen darf, zwischen vier verschiedenen Eröffnungen wählen. Diese werden
                    auf dieser und der nächsten Seite erklärt.
                </Typography>
            )}

            <Box className={classes.openingContainer}>
                {instructions.map((instruction, index) => {
                    if (openingPage === 1 && (index === 2 || index === 3)) return;
                    if (openingPage === 2 && (index === 0 || index === 1)) return;

                    return (
                        <Box className={classes.opening}>
                            <Typography
                                variant={matches ? "h6" : "body1"}
                                style={{ fontWeight: "normal", width: "100%" }}
                            >
                                {instructionTitles[index]}
                            </Typography>
                            <Typography align="justify" variant={matches ? "body1" : "body2"}>
                                {instruction}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default InstructionPage2;
