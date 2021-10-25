import p5Types from "p5"; //Import this for typechecking and intellisense

export class ConwaysGrid {
    gridWidth: number;
    gridHeight: number;
    grid: boolean[][];
    cellSize: number = 35;
    currentDelay: number;
    updateDelay: number = 15;

    constructor(gridWidth: number, gridHeight: number) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.grid = [];
        this.currentDelay = this.updateDelay - 1;

        for (let i: number = 0; i < Math.floor(this.gridHeight / this.cellSize); i++) {
            this.grid[i] = [];
            for (let q: number = 0; q < Math.ceil(this.gridWidth / this.cellSize); q++) {
                this.grid[i][q] = false;
            }
        }
    }

    public toggleCell(x: number, y: number) {
        let i: number;
        let q: number;

        i = Math.floor(y / this.cellSize);
        q = Math.floor(x / this.cellSize);

        this.grid[i][q] = !this.grid[i][q];
    }

    public setSpeed(delay: number) {
        this.updateDelay = 100 - delay;
    }

    public clearGrid() {
        for (let i: number = 0; i < this.grid.length; i++) {
            for (let q: number = 0; q < this.grid[0].length; q++) {
                this.grid[i][q] = false;
            }
        }
    }

    public update(p5: p5Types) {
        if (this.currentDelay < this.updateDelay) {
            this.currentDelay++;
        } else {
            this.currentDelay = 0;

            let nextGrid: boolean[][] = [];

            for (let i: number = 0; i < this.grid.length; i++) {
                nextGrid[i] = [];
                for (let q: number = 0; q < this.grid[0].length; q++) {
                    let count: number = this.countNeighbours(i, q);

                    if (this.grid[i][q]) {
                        if (count < 2 || count > 3) nextGrid[i][q] = false;
                        else nextGrid[i][q] = true;
                    } else {
                        if (count === 3) nextGrid[i][q] = true;
                        else nextGrid[i][q] = false;
                    }
                }
            }
            this.grid = nextGrid;
        }
    }

    public countNeighbours(i: number, q: number) {
        let count: number = 0;
        if (i - 1 >= 0) {
            if (this.grid[i - 1][q - 1]) count++;
            if (this.grid[i - 1][q]) count++;
            if (this.grid[i - 1][q + 1]) count++;
        }
        if (i + 1 < this.grid.length) {
            if (this.grid[i + 1][q - 1]) count++;
            if (this.grid[i + 1][q]) count++;
            if (this.grid[i + 1][q + 1]) count++;
        }

        if (this.grid[i][q - 1]) count++;
        if (this.grid[i][q + 1]) count++;

        return count;
    }

    public show(p5: p5Types) {
        for (let i: number = 0; i < this.grid.length; i++) {
            for (let q: number = 0; q < this.grid[0].length; q++) {
                if (this.grid[i][q]) {
                    p5.fill(255);
                } else {
                    p5.fill(31);
                }
                p5.stroke(255);
                p5.strokeWeight(0.2);
                p5.square(this.cellSize / 2 + this.cellSize * q, this.cellSize / 2 + this.cellSize * i, this.cellSize);
            }
        }
    }
}
