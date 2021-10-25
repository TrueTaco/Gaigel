import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 800,
    },
    paper: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 5,
        display: "flex",
        alignItems: "center",
    },
    name: {
        marginRight: "auto",
        width: "60%",
    },
});

interface Props {
    index: number;
    name: string;
    location: string;
    completed: string;
    toggleComplete: (name: string, location: string, completed: string, firstTry: boolean) => void;
    deleteItem: (name: string, location: string, firstTry: boolean) => void;
    changeName: (name: string, location: string, newName: string, firstTry: boolean) => void;
}

const ShoppingItem: React.FC<Props> = ({ index, name, location, completed, toggleComplete, deleteItem, changeName }) => {
    const classes = useStyles();
    const [editing, setEditing] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>(name);
    const makeshiftId: string = index.toString().concat(location);

    const handleEdit = () => {
        setEditing(!editing);
    };

    const handleSave = () => {
        changeName(name, location, productName, true);
        handleEdit();
    };

    const handleTextChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setProductName(event.target.value as string);
    };

    useEffect(() => {
        if (!editing) setProductName(name);

        const listener = (event: any) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                if (document.getElementById(makeshiftId) === document.activeElement) {
                    handleSave();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, [editing, name, makeshiftId, handleSave]);

    return (
        <Grid className={classes.root} item>
            <Paper className={classes.paper}>
                {editing ? (
                    <>
                        <TextField
                            id={makeshiftId}
                            className={classes.name}
                            value={productName}
                            autoFocus
                            onChange={handleTextChange}
                            inputProps={{ maxLength: 75 }}
                        />
                        <IconButton onClick={handleSave}>
                            <SaveIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Typography
                            className={classes.name}
                            style={{ textDecoration: completed === "1" ? "line-through" : "none" }}
                            noWrap
                            onClick={() => {
                                toggleComplete(name, location, completed, true);
                            }}
                        >
                            {name}
                        </Typography>
                        <IconButton onClick={handleEdit}>
                            <EditIcon />
                        </IconButton>
                    </>
                )}

                <IconButton
                    onClick={() => {
                        deleteItem(name, location, true);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Paper>
        </Grid>
    );
};

export default ShoppingItem;
