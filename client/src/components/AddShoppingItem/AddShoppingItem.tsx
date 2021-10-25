import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 800,
        marginTop: 5,
        marginBottom: 10,
    },
    paper: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 10,
        margin: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textfield: {
        width: "40%",
    },
    select: {
        width: "40%",
        marginLeft: 15,
    },
    add: { marginLeft: 10 },
    refresh: {},
});

interface Props {
    locations: string[];
    addItem: (name: string, location: string, firstTry: boolean) => void;
    handleRefresh: () => void;
}

const AddShoppingItem: React.FC<Props> = ({ locations, addItem, handleRefresh }) => {
    const classes = useStyles();
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("Rewe");

    const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLocation(event.target.value as string);
    };

    const handleTextChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setName(event.target.value as string);
    };

    useEffect(() => {
        const listener = (event: any) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                if (document.getElementById("AddShoppingItem-TextField") === document.activeElement) {
                    handleAdd();
                }
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    const handleAdd = () => {
        if (name !== "") addItem(name, location, true);
        setName("");
    };

    return (
        <Grid className={classes.root} item>
            <Paper className={classes.paper}>
                <TextField
                    id="AddShoppingItem-TextField"
                    className={classes.textfield}
                    value={name}
                    autoFocus
                    label="Product"
                    onChange={handleTextChange}
                    inputProps={{ maxLength: 75 }}
                />
                <FormControl className={classes.select}>
                    <InputLabel>Location</InputLabel>
                    <Select value={location} onChange={handleSelectChange}>
                        {locations.map((item) => (
                            <MenuItem value={item} key={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <IconButton className={classes.add} onClick={handleAdd}>
                    <AddIcon />
                </IconButton>
                <IconButton className={classes.refresh} onClick={handleRefresh}>
                    <RefreshIcon />
                </IconButton>
            </Paper>
        </Grid>
    );
};

export default AddShoppingItem;
