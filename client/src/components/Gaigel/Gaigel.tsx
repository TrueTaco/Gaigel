import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import UserCards from "../../components/UserCards/UserCards";

const useStyles = makeStyles({
    root: {},
});

interface Props {}

const Gaigel: React.FC<Props> = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <UserCards />
        </Grid>
    );
};

export default Gaigel;
