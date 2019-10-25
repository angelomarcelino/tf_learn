class NumCanvas {
  constructor(CANVAS_SIZE = 28, PIXEL_SIZE = 10) {
    this.canvasSize = CANVAS_SIZE;
    this.pixelSize = PIXEL_SIZE;
    this.offset = (MAIN_CANVAS_SIZE - this.canvasSize * this.pixelSize) / 2;

    this.values = [];
    let posY = 0;
    for (let i = 0; i < this.canvasSize; i++) {
      this.values[i] = [];
      let posX = 0;
      for (let j = 0; j < this.canvasSize; j++) {
        this.values[i][j] = {
          value: 0,
          x: this.offset + posX,
          y: this.offset + posY
        };
        posX += this.pixelSize;
      }
      posY += this.pixelSize;
    }
  }

  draw() {
    translate(this.offset, this.offset);
    let posY = 0;
    for (let i = 0; i < this.canvasSize; i++) {
      let posX = 0;
      for (let j = 0; j < this.canvasSize; j++) {
        constrain(this.values[i][j].value, 0, 1);
        fill(this.values[i][j].value * 255);
        stroke(127);
        rect(posX, posY, this.pixelSize, this.pixelSize);
        posX += this.pixelSize;
      }
      posY += this.pixelSize;
    }
  }

  paintNearest(x, y) {
    let minDist = Infinity;
    let iBest = 0;
    let jBest = 0;
    for (let i = 0; i < this.canvasSize; i++) {
      for (let j = 0; j < this.canvasSize; j++) {
        let d = dist(x, y, this.values[i][j].x, this.values[i][j].y);
        if (d < minDist) {
          minDist = d;
          iBest = i;
          jBest = j;
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let newi = i + iBest - 1;
        let newj = j + jBest - 1;
        if (newi > 0 && newi < this.canvasSize) {
          if (newj > 0 && newj < this.canvasSize) {
            if (this.values[newi][newj].value < 0.3)
              this.values[newi][newj].value += 0.05;
          }
        }
      }
    }
    // if (jBest + 1 < this.canvasSize - 1 &&  this.values[iBest][jBest].value != 1)
    //     this.values[iBest][jBest + 1].value += 0.1;
    this.values[iBest][jBest].value = 1;
  }
}
