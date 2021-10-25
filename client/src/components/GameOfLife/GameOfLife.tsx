import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import Box from "@material-ui/core/Box";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

import { ConwaysGrid } from "./ConwaysGrid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            marginBottom: 10,
        },
        slider: {
            [theme.breakpoints.down("sm")]: {
                marginLeft: 20,
                marginRight: 20,
            },
            [theme.breakpoints.up("sm")]: {
                marginLeft: 50,
                marginRight: 50,
            },
            [theme.breakpoints.up("md")]: {
                marginLeft: 100,
                marginRight: 100,
            },

            width: "50%",
        },
        button: {
            width: 80,
            borderRadius: 7,
        },
        switchText: {
            marginLeft: 0,
            marginRight: 0,
            color: "white",
        },
    })
);

interface Props {}

const GameOfLife: React.FC<Props> = () => {
    const classes = useStyles();
    let play: boolean = false;
    let cgrid: ConwaysGrid;
    const offset: number = 185;

    //See annotations in JS for more information
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        let cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight - offset).parent(canvasParentRef);

        p5.rectMode("center");

        cgrid = new ConwaysGrid(p5.windowWidth, p5.windowHeight - offset);

        cnv.mousePressed(() => {
            cgrid.toggleCell(p5.mouseX, p5.mouseY);
        });
    };

    const draw = (p5: p5Types) => {
        p5.clear();

        if (play) {
            cgrid.update(p5);
        }

        cgrid.show(p5);
    };

    const windowResized = (p5: p5Types) => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight - offset);
    };

    const togglePlay = () => {
        play = !play;
    };

    function valuetext(value: number) {
        if (cgrid) cgrid.setSpeed(value);
        return value.toString();
    }

    const clearGrid = () => {
        cgrid.clearGrid();
    };

    return (
        <>
            <Box className={classes.root} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                <Typography className={classes.switchText}>Pause</Typography>
                <Switch onChange={togglePlay} color="primary" inputProps={{ "aria-label": "primary checkbox" }} />
                <Typography className={classes.switchText}>Play</Typography>

                <Slider
                    className={classes.slider}
                    getAriaValueText={valuetext}
                    aria-labelledby="speed-slider"
                    defaultValue={85}
                    step={2}
                    min={0}
                    max={100}
                />
                <Button className={classes.button} variant="contained" onClick={clearGrid}>
                    Clear
                </Button>
            </Box>
            <Sketch setup={setup} draw={draw} windowResized={windowResized} />
        </>
    );
};

export default GameOfLife;
