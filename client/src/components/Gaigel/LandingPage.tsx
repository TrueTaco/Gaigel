import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button, TextField, Box, Typography } from "@material-ui/core";

import Header from "./Header";

const useStyles = makeStyles({
    root: {
        maxWidth: "420px",
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
        boxShadow: "5px 5px 15px black",
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
            <Header />

            <Typography align="center" variant="h6" style={{ fontWeight: "lighter" }}>
                Entscheide dich für einen Nutzernamen und tritt einer Lobby bei!
            </Typography>

            <TextField
                className={classes.textField}
                color="primary"
                autoFocus
                variant="outlined"
                label="Nutzername"
                onChange={handleUsernameChange}
                inputProps={{ maxLength: 10 }}
            />

            <TextField
                className={classes.textField}
                autoFocus
                variant="outlined"
                label="Lobbycode"
                onChange={handleLobbycodeChange}
                inputProps={{ maxLength: 10 }}
                helperText="Tipp: Bei einem bisher nicht verwendeten Lobbycode wird automatisch eine neue Lobby
                erstellt."
            />

            <Button variant="contained" onClick={handleLogin}>
                Beitreten
            </Button>
        </Box>
    );
};

export default LandingPage;
