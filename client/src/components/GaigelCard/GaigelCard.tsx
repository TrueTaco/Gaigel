import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        width: 75,
        height: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            <Box>
                <Typography>{type}</Typography>
                <Typography>{value}</Typography>
            </Box>
        </Paper>
    );
};

export default GaigelCard;
