import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {},
});

interface Props {
    login: () => void;
}

const LandingPage: React.FC<Props> = ({ login }) => {
    const classes = useStyles();

    return (
        <>
            <Button variant="contained" onClick={login}>
                Login
            </Button>
        </>
    );
};

export default LandingPage;
