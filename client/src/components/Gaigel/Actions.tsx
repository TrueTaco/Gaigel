import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "space-between",
        gap: "40px",
    },
});

interface Props {
    canCall: boolean;
    announcing: boolean;
    melden: () => void;
    canSteal: boolean;
    rauben: () => void;
}

const Actions: React.FC<Props> = ({ canCall, announcing, melden, canSteal, rauben }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            {canCall && (
                <Button
                    variant="contained"
                    size="small"
                    style={{
                        background: announcing === false ? "#e0e0e0" : "#ffdd1f",
                    }}
                    onClick={melden}
                >
                    Melden
                </Button>
            )}

            {canSteal && (
                <Button variant="contained" size="small" onClick={rauben}>
                    Rauben
                </Button>
            )}
        </Box>
    );
};

export default Actions;
