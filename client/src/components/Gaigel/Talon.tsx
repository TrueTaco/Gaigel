import { makeStyles } from "@material-ui/core/styles";

import { Grid, Paper, CardActionArea, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px",
    },
    cardActionArea: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
    paper: {
        width: 40,
        height: 60,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    counter: {
        fontWeight: "lighter",
    },
    header: {
        fontWeight: "lighter",
    },
});

interface Props {
    cardsLeft: number;
    drawCard: (amount: number) => void;
}

const Talon: React.FC<Props> = ({ cardsLeft, drawCard }) => {
    const classes = useStyles();

    return (
        <Grid item className={classes.root}>
            <Typography className={classes.header}>Talon</Typography>
            <Paper className={classes.paper}>
                <CardActionArea
                    className={classes.cardActionArea}
                    onClick={() => {
                        drawCard(1);
                    }}
                >
                    <img
                        src={"/cardBacksite_noSpaceAround_n1.png"}
                        width={"40"}
                        height={"60"}
                        alt=""
                    />
                </CardActionArea>
            </Paper>
            <Typography variant="subtitle2" className={classes.counter}>
                Karten: {cardsLeft}
            </Typography>
        </Grid>
    );
};

export default Talon;
