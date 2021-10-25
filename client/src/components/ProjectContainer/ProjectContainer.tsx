import { makeStyles } from "@material-ui/core/styles";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    root: {
        marginTop: 5,
        marginBottom: 5,
    },
});

interface Props {}

interface Project {
    title: string;
    subtitle: string;
    description: string;
    imagePath: string;
    path: string;
}

const ProjectContainer: React.FC<Props> = () => {
    const classes = useStyles();
    const projects: Project[] = [
        {
            title: "Shopping List",
            subtitle: "A simple Todo List",
            description:
                "This project contains a simple implementation of a todo list. You can add items by following these 4 steps:§⠀§1. Enter a list code. This is the keyword you will use to access your list. Make sure not to use something too generic as this might lead to others using your keyword by accident.§2. Enter the desired name of the list item you would like to add.§3. Click on the menu in the center to choose a location where you would like to get your item.§4. Press enter or click on the button on the right to add the item to the list.§⠀§You can cross items out by clicking on them. In addition to that you can also rename and delete items. Just click on the corresponding icons on the right of each item. Make sure to press enter or click on the save icon on the right in order to save your changes after renaming.",
            imagePath: "shoppinglist.png",
            path: "/shopping",
        },
        {
            title: "Conway's Game of Life",
            subtitle: "Cellular automaton",
            description:
                "The Game of Life is a game that is based on a grid of cells. A cell can either be alive or dead which is indicated by the color of it. Each iteration the following 4 simple rules are applied:§⠀§1. Cells with less than 2 neighbours die of loneliness.§2. Cells with exactly 2 or 3 neighbours survive.§3. Cells with more than 3 neighbours die of overcrowding.§4. Cells with exactly 3 neighbours come back to life.§⠀§Click on a cell to toggle its state and click on the switch to start the simulation. You can pause the game by pressing the same switch again. The speed of the simulation can be adjusted by using the slider. Last but not least you can clear the grid with the button on the right.",
            imagePath: "gameoflife.png",
            path: "/gameoflife",
        },
    ];

    return (
        <Grid className={classes.root} container justifyContent="center">
            {projects.map((project) => (
                <Grid item key={project.title}>
                    <ProjectCard project={project}></ProjectCard>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectContainer;
