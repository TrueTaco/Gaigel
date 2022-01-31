import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        minWidth: "300px",
        maxWidth: "420px",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
    },
    info: {
        textAlign: "center",
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

    const handleLogin = () => {
        if (username !== "" && lobbycode !== "") {
            login(username, lobbycode);
        }
    };

    useEffect(() => {
        const listener = (event: any) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                handleLogin();
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    return (
        <Box className={classes.root}>
            <Typography className={classes.info}>
                Tipp: Bei einem bisher nicht verwendeten Lobbycode wird automatisch eine neue Lobby
                erstellt.
            </Typography>
            <TextField
                className={classes.textField}
                color="primary"
                required
                autoFocus
                variant="outlined"
                label="Nutzername"
                onChange={handleUsernameChange}
                inputProps={{ maxLength: 10 }}
            />

            <TextField
                className={classes.textField}
                required
                autoFocus
                variant="outlined"
                label="Lobbycode"
                onChange={handleLobbycodeChange}
                inputProps={{ maxLength: 10 }}
            />

            <Button variant="contained" onClick={handleLogin}>
                Beitreten
            </Button>
        </Box>
    );
};

export default LandingPage;
