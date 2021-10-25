import React, { useState } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
        margin: 10,
    },
    image: {
        margin: 5,
        height: 150,
        // width: 340,
        width: "97%",
    },
    description: {
        marginBottom: 0,
    },
    readMore: {
        marginLeft: "auto",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        // transition: theme.transitions.create("transform", {
        //     duration: theme.transitions.duration.shortest,
        // }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
});

interface Props {
    project: {
        title: string;
        subtitle: string;
        description: string;
        imagePath: string;
        path: string;
    };
}

const ProjectCard: React.FC<Props> = ({ project }) => {
    const classes = useStyles();
    const description: string = project.description;
    const descriptionSplit: string[] = description.split("§");
    const readMoreButton: boolean = true;

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const history = useHistory();
    const handleOnClick = () => {
        history.push(project.path);
    };

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleOnClick}>
                <CardMedia
                    className={classes.image}
                    component="img"
                    alt={project.title}
                    image={project.imagePath}
                    title={project.title}
                />
                <CardContent>
                    <Typography variant="h5">{project.title}</Typography>
                    <Typography variant="subtitle1">{project.subtitle}</Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                {readMoreButton ? (
                    <Button
                        className={classes.readMore}
                        endIcon={
                            <ExpandMoreIcon
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                            />
                        }
                        onClick={handleExpandClick}
                    >
                        {expanded ? "Read less" : "Read more"}
                    </Button>
                ) : (
                    <>
                        <Typography className={classes.readMore} variant="body2">
                            {expanded ? "Read less" : "Read more"}
                        </Typography>

                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </>
                )}
            </CardActions>

            <Collapse in={expanded} timeout="auto">
                <CardContent>
                    {description !== "" &&
                        descriptionSplit.map((section, index) => (
                            <Typography className={classes.description} variant="body1" key={index}>
                                {section}
                            </Typography>
                        ))}
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default ProjectCard;
