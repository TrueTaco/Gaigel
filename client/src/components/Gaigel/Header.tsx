import { makeStyles, Theme, useTheme, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.up("sm")]: {
                marginLeft: 100,
                marginRight: 100,
            },

            transition: "0.5s",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            gap: "20px",
        },
        logo: {
            width: "50px",
            [theme.breakpoints.up("md")]: {
                width: "70px",
            },
        },
    })
);

interface Props {}

const Header: React.FC<Props> = () => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            <Box className={classes.root}>
                <img src={"/Header_symbols.png"} className={classes.logo} />
                <Typography
                    align="center"
                    variant={matches ? "h2" : "h3"}
                    style={{ fontWeight: "lighter" }}
                >
                    Gaigel
                </Typography>
                <img src={"/Header_symbols_mirror.png"} className={classes.logo} />
            </Box>

            <hr style={{ width: "100%" }} />
        </>
    );
};

export default Header;
