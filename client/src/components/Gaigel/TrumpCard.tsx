import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import GaigelCard from "./GaigelCard";

const useStyles = makeStyles({
    root: {
        width: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    header: {
        marginBottom: 10,
    },
    footer: {
        marginTop: 10,
    },
});

interface Props {
    trumpCard: CardProps;
}

interface CardProps {
    type: string;
    value: string;
}

const TrumpCard: React.FC<Props> = ({ trumpCard }) => {
    const classes = useStyles();
    let emptyChar: string = "⠀";

    return (
        <Grid className={classes.root}>
            <Typography className={classes.header}>Trump</Typography>
            <GaigelCard type={trumpCard.type} value={trumpCard.value} clickable={false} />
            <Typography className={classes.footer}>{emptyChar}</Typography>
        </Grid>
    );
};

export default TrumpCard;
