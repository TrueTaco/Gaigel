import { makeStyles } from "@material-ui/core/styles";

import { Grid, Box, Typography } from "@material-ui/core";

import GaigelCard from "./GaigelCard";

const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
    },
    header: {
        fontWeight: "lighter",
    },
});

interface Props {
    userCards: CardProps[];
    playCard: (type: string, value: string) => void;
}

interface CardProps {
    type: string;
    value: string;
}

const YourCards: React.FC<Props> = ({ userCards, playCard }) => {
    const classes = useStyles();
    let i: number = 0;

    let filledUserCards: CardProps[] = userCards.slice();

    for (let q = filledUserCards.length; q < 5; q++) {
        filledUserCards.splice(filledUserCards.length, 0, { type: "", value: "" });
    }

    return (
        <Box className={classes.root}>
            <Typography className={classes.header}>Deine Karten</Typography>

            <Grid container spacing={1} justifyContent="center">
                {filledUserCards.map((card) => {
                    i++;
                    let currentClickable = card.type === "" ? false : true;
                    return (
                        <Grid item key={i}>
                            <GaigelCard
                                type={card.type}
                                value={card.value}
                                clickable={currentClickable}
                                playCard={playCard}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default YourCards;
