import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {},
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
        <Grid
            container
            className={classes.root}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            direction="column"
            spacing={3}
        >
            <Grid item>
                <TextField
                    required
                    autoFocus
                    variant="outlined"
                    onChange={handleUsernameChange}
                    inputProps={{ maxLength: 15 }}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    autoFocus
                    variant="outlined"
                    onChange={handleLobbycodeChange}
                    inputProps={{ maxLength: 15 }}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={login}>
                    Einloggen
                </Button>
            </Grid>
        </Grid>
    );
};

export default LandingPage;
