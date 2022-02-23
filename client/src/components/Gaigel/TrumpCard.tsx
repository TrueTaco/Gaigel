import { makeStyles, Theme, useTheme, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import GaigelCard from "./GaigelCard";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
        },
        header: {
            fontWeight: "lighter",
        },
    })
);
interface Props {
    trumpCard: CardProps;
}

interface CardProps {
    type: string;
    value: string;
}

const TrumpCard: React.FC<Props> = ({ trumpCard }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    let emptyChar: string = "⠀";

    return (
        <Grid className={classes.root}>
            <Typography variant={matches ? "h6" : "body1"} className={classes.header}>
                Trumpf
            </Typography>
            <GaigelCard type={trumpCard.type} value={trumpCard.value} clickable={false} />
            <Typography variant={matches ? "body1" : "subtitle2"}>{emptyChar}</Typography>
        </Grid>
    );
};

export default TrumpCard;
