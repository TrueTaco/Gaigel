import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        color: "white",
        padding: 15,
        backgroundColor: "#080808",
    },
    footer: {
        marginTop: "auto",
    },
});

interface Props {}

const Footer: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Typography className={classes.root} align="center" variant="subtitle1">
                Copyright © 2021 Leon Obermann
            </Typography>
        </footer>
    );
};

export default Footer;
