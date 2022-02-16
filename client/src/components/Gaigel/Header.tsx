import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        marginLeft: 150,
        marginRight: 150,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        gap: "20px",
    },
    logo: {
        width: "50px",
    },
});

interface Props {}

const Header: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <img src={"/symbols.png"} className={classes.logo} />
            <Typography align="center" variant="h4">
                Gaigel
            </Typography>
            <img src={"/symbols.png"} className={classes.logo} />
        </Box>
    );
};

export default Header;
