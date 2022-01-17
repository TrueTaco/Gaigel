import { useState } from "react";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
});

interface Props {
    name: string;
}

const PlayerList: React.FC<Props> = ({ name }) => {
    const classes = useStyles();
    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                <Grid item>
                    <List dense={dense}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={name}
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};

export default PlayerList;
