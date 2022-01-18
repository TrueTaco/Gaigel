import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {},
});

interface Props {}

const LandingPage: React.FC<Props> = () => {
    const classes = useStyles();

    return <div>HELLO AND WELCOME TO CHILLIS</div>;
};

export default LandingPage;
