import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import Hidden from "@material-ui/core/Hidden";
import { useHistory, useLocation } from "react-router-dom";

// import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";

const useStyles = makeStyles({
    root: {
        // flexGrow: 1,
    },
    header: {
        backgroundColor: "#070707",
    },
    menuButton: {
        color: "white",
        margin: 10,
        // marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: "pointer",
    },
    projectName: {
        fontWeight: 400,
    },
});

interface Hash {
    [details: string]: string;
}

interface Props {}

const Navbar: React.FC<Props> = () => {
    const classes = useStyles();

    const locationMap: Hash = {};
    locationMap["/"] = "Homepage";
    locationMap["/gameoflife"] = "Game of Life";
    locationMap["/shopping"] = "Shopping List";
    const location = useLocation();

    const history = useHistory();
    const handleOnClick = () => {
        history.push("/");
    };

    // const navElements: string[] = ["Home", "About", "Contact"];

    return (
        <div className={classes.root}>
            <AppBar className={classes.header} position="sticky">
                <Toolbar>
                    <Typography onClick={handleOnClick} variant="h5" className={classes.title}>
                        obrm.tech
                    </Typography>
                    <Typography variant="h6" className={classes.projectName}>
                        {locationMap[location.pathname]}
                    </Typography>
                    {/* <Hidden smUp>
                        <TemporaryDrawer items={navElements} />
                    </Hidden>
                    <Hidden xsDown>
                        {navElements.map((text) => (
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.menuButton}
                            >
                                {text}
                            </Button>
                        ))}
                    </Hidden> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
