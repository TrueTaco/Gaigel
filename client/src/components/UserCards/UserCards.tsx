import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import GaigelCard from "../../components/GaigelCard/GaigelCard";

const useStyles = makeStyles({
    root: {},
});

interface Props {
    userCards: CardProps[];
    playCard: (type: string, value: string) => void;
}

interface CardProps {
    type: string;
    value: string;
}

const UserCards: React.FC<Props> = ({ userCards, playCard }) => {
    const classes = useStyles();
    let i: number = 0;

    return (
        <Grid className={classes.root} container spacing={2} justifyContent="center">
            {userCards.map((card) => {
                i++;
                return (
                    <Grid item key={i}>
                        <GaigelCard
                            type={card.type}
                            value={card.value}
                            clickable={true}
                            playCard={playCard}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default UserCards;
