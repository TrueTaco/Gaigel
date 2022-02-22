import { makeStyles, Theme, useTheme, createStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            justifyContent: "space-between",
            gap: "40px",
        },
    })
);

interface Props {
    canCall: boolean;
    announcing: boolean;
    melden: () => void;
    canSteal: boolean;
    rauben: () => void;
}

const Actions: React.FC<Props> = ({ canCall, announcing, melden, canSteal, rauben }) => {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <Box className={classes.root}>
            {canCall && (
                <Button
                    variant="contained"
                    size={matches ? "medium" : "small"}
                    style={{
                        background: announcing === false ? "#e0e0e0" : "#ffdd1f",
                    }}
                    onClick={melden}
                >
                    Melden
                </Button>
            )}

            {canSteal && (
                <Button variant="contained" size={matches ? "medium" : "small"} onClick={rauben}>
                    Rauben
                </Button>
            )}
        </Box>
    );
};

export default Actions;
