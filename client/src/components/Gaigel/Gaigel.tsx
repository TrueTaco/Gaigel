import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import UserCards from "../../components/UserCards/UserCards";
import Talon from "../../components/Talon/Talon";

const useStyles = makeStyles({
    root: {
        margin: 10,
    },
});

interface Props {}

const Gaigel: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.root} justifyContent="center" container>
            <Talon />
            <UserCards />
        </Grid>
    );
};

export default Gaigel;
