import { makeStyles } from "@material-ui/core/styles";
import { Box, IconButton, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles({
    root: {
        zIndex: 50,
        position: "fixed",
        top: "45%",
        left: "50%",
        width: "30%",
        maxWidth: "500px",
        minWidth: "300px",
        transform: "translate(-50%, -50%)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "5px 5px 15px black",
        background: "white",
        opacity: "1",
        transition: "1s",
        animation: "fade 4s linear",
    },
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    "@keyframes fade": {
        "0%": {
            opacity: 0,
        },
        "50%": {
            opacity: 1,
        },
        "100%": {
            opacity: 0,
        },
    },
});

interface Props {}

const OpeningInstructions: React.FC<Props> = () => {
    const classes = useStyles();
    const [width, setWidth] = useState(window.innerWidth);
    const [currentPage, setCurrentPage] = useState<number>(0);
    let instructions: (string | undefined)[] = [
        "Bei dieser Eröffnungsmöglichkeit wird ein As verdeckt durch die Vorhand gespielt. Falls alle anderen ihre Karte auch verdeckt gespielt haben, so werden die vier Karten gleichzeitig gewendet. Der Stich gehört dem Spieler, der das gleiche As wie die Vorhand gespielt hat. Ist dieses nicht der Fall, gehört der Stich der Vorhand.",
        "In dieser Eröffnungsmöglichkeit wird das As von der Vorhand offen ausgespielt. Die anderen Spieler können nun eine beliebige Karte abwerfen. Der Stich geht dann an den Spielbeginner.",
        "Bei Höher hat wird eine Karte ausgespielt, welche weder ein As, noch ein Trumpf ist. Die Vorhand spielt diese Karte verdeckt aus. Auch die anderen Spieler spielen eine verdeckte Karte aus. Der Stich geht an den Spieler, welcher eine Karte mit der gleichen Farbe, aber höherem Wert gelegt hat. Wird keine Karte der gleichen Farbe mit höherem Wert gelegt, so geht der Stich an die Vorhand.",
        "Eine weitere Eröffnungsmöglichkeit bietet Dissle. Sagt die Vorhand zu Beginn des Spiels, dass auf Dissle gespielt wird, so gewinnt die Vorhand das Spiel, falls im Verlauf fünf Siebener auf die Hand kommen. Die Gegner können allerdings vorher schon das reguläre Spielende erreichen. Außerdem hat die Vorhand das Spiel auch verloren, wenn ein Stich gemacht werden muss.",
    ];
    let instructionTitles: (string | undefined)[] = [
        "Andere Alte hat",
        "Ge-Elfen",
        "Höher hat",
        "Auf Dissle",
    ];

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, []);

    const pageDown = () => {
        let newPage = currentPage - 1 < 0 ? 0 : currentPage - 1;
        console.log(newPage);
        setCurrentPage(newPage);
    };

    const pageUp = () => {
        let newPage = currentPage + 1 > 3 ? 0 : currentPage + 1;
        console.log(newPage);
        setCurrentPage(newPage);
    };

    return (
        <Box className={classes.root}>
            <Box className={classes.buttons}>
                <IconButton>
                    <ArrowBackIosIcon onClick={pageDown} />
                </IconButton>
                <Typography variant={"body1"}>{instructionTitles[currentPage]}</Typography>
                <IconButton>
                    <ArrowForwardIosIcon onClick={pageUp} />
                </IconButton>
            </Box>

            <Typography variant={"caption"}>{instructions[currentPage]}</Typography>
        </Box>
    );
};

export default OpeningInstructions;
