import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Card, Button } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles({
    root: {
        zIndex: 50,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "5px 5px 15px black",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: "5px",
    },
    logo: {
        width: "50px",
    },
    rankingHeader: {
        textAlign: "center",
        fontWeight: "lighter",
    },
    rankingContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    rankingElement: {
        display: "flex",
        justifyContent: "space-between",
    },
    rankingElementText: {
        fontWeight: "lighter",
    },
    footer: {
        marginTop: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        gap: "30px",
    },
});

interface Props {}

const EndPopup: React.FC<Props> = () => {
    const classes = useStyles();

    const ranking = [
        {
            username: "Michel",
            score: 115,
        },
        {
            username: "Till",
            score: 90,
        },
        {
            username: "Alex",
            score: 56,
        },
        {
            username: "Marko",
            score: 21,
        },
    ];

    return (
        <Card className={classes.root}>
            <Box className={classes.header}>
                <img src={"/crown.png"} className={classes.logo} />
                <Typography align="center" variant="h4">
                    {ranking[0].username} hat gewonnen!
                </Typography>
            </Box>

            <hr />

            <Typography className={classes.rankingHeader} variant="h6">
                Platzierungen
            </Typography>

            <Box className={classes.rankingContainer}>
                {ranking.map((rank, index) => (
                    <Box className={classes.rankingElement}>
                        <Typography className={classes.rankingElementText}>
                            {index + 1}. {rank.username}
                        </Typography>
                        <Typography className={classes.rankingElementText}>
                            {rank.score} Punkte
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box className={classes.footer}>
                <Button startIcon={<ArrowBackIcon />} variant="contained">
                    Lobby
                </Button>
                <Typography align="right" noWrap={true}>
                    Nächste Runde in <b>30</b>
                </Typography>
            </Box>
        </Card>
    );
};

export default EndPopup;
