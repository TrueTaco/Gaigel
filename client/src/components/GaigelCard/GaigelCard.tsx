import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles({
    root: {
        width: 75,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    cardActionArea: {
        height: "100%",
        width: "100%",
        display: "flex",
    },
});

interface Props {
    type: string;
    value: string;
}

const GaigelCard: React.FC<Props> = ({ type, value }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} onClick={() => console.log(type + value)}>
            <CardActionArea className={classes.cardActionArea}>
                <Box>
                    <Typography>{type}</Typography>
                    <Typography>{value}</Typography>
                </Box>
            </CardActionArea>
        </Paper>
    );
};

export default GaigelCard;
