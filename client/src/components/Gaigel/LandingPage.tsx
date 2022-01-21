import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    root: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
    },
    textField: {
        backgroundColor: "#ffffff",
        borderRadius: 4,
        fontSize: 5,
    },
});

interface Props {
    login: () => void;
}

const LandingPage: React.FC<Props> = ({ login }) => {
    const classes = useStyles();
    const [username, setUsername] = useState<string>("");
    const [lobbycode, setLobbycode] = useState<string>("");

    const handleUsernameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setUsername(event.target.value as string);
    };

    const handleLobbycodeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLobbycode(event.target.value as string);
    };

    return (
        <Box className={classes.root}>
            <TextField
                className={classes.textField}
                color="primary"
                required
                autoFocus
                variant="outlined"
                label="Nutzername"
                onChange={handleUsernameChange}
                inputProps={{ maxLength: 15 }}
            />

            <TextField
                className={classes.textField}
                required
                autoFocus
                variant="outlined"
                label="Lobbycode"
                onChange={handleLobbycodeChange}
                inputProps={{ maxLength: 15 }}
            />

            <Button variant="contained" onClick={login}>
                Einloggen
            </Button>
        </Box>
    );
};

export default LandingPage;
