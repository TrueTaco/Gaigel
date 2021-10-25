import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        width: "90%",
        maxWidth: 400,
        marginTop: 5,
        marginBottom: 10,
    },
    paper: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textfield: {
        width: "50%",
    },
    button: {
        marginLeft: 15,
    },
});

interface Props {
    handleCodeSubmit: (newCode: string) => void;
}

const ShoppingCode: React.FC<Props> = ({ handleCodeSubmit }) => {
    const [text, setText] = useState<string>("");
    const classes = useStyles();

    const handleTextChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setText(event.target.value as string);
    };

    useEffect(() => {
        const listener = (event: any) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                handleCodeSubmit(text);
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    return (
        <Grid className={classes.root} item>
            <Paper className={classes.paper}>
                <TextField
                    className={classes.textfield}
                    required
                    autoFocus
                    variant="outlined"
                    label="List code"
                    onChange={handleTextChange}
                    inputProps={{ maxLength: 15 }}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    onClick={() => {
                        handleCodeSubmit(text);
                    }}
                >
                    Submit
                </Button>
            </Paper>
        </Grid>
    );
};

export default ShoppingCode;
