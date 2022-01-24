import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField, Box } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: "300px",
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
    },
});

interface Props {
    login: (username: string, lobbycode: string) => void;
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

            <Button
                variant="contained"
                onClick={() => {
                    if (username !== "" && lobbycode !== "") {
                        login(username, lobbycode);
                    }
                }}
            >
                Einloggen
            </Button>
        </Box>
    );
};

export default LandingPage;
