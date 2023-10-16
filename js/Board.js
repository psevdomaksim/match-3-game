class Board {
  constructor(game) {
    this.container = new PIXI.Container();

    this.game = game;
    this.fields = [];


    

    if (app.screen.width > config.mobileWidth) {
      this.rows = config.field.rows;
      this.cols = config.field.cols;
    } else {
      this.rows = config.fieldMobile.rows;
      this.cols = config.fieldMobile.cols;
    }

    this.ajustPosition();
    this.container.x = app.screen.width / 2;
    this.container.y = app.screen.height / 2 + 70;
    app.stage.addChild(this.container);
  }

  render() {
    this.createFields();
    this.createTiles();



    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;
    
  }


  isEmpty(){
    let empty = this.fields.find(field=>field.tile!=null)
    if(!empty) this.game.interface.seconds = 0;
  }






  createTiles() {
    this.fields.forEach((field) => this.createTile(field));
  }

  createTile(field) {
    const tile = new Tile(this.game);

    field.setTile(tile);
    this.container.addChild(tile.sprite);

    tile.sprite.interactive = true;
    tile.sprite.on("pointerdown", () => {
      this.container.emit("tile-touch-start", tile);
    });

    return tile;
  }

  getField(row, col) {
    return this.fields.find((field) => field.row === row && field.col === col);
  }

  createFields() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createField(row, col);
      }
    }
  }
  createField(row, col) {
    const field = new Field(row, col);
    this.fields.push(field);
    this.container.addChild(field.sprite);
  }

  ajustPosition() {
    this.fieldSize = config.field.cellSize;
    this.width = this.cols * this.fieldSize;
    this.height = this.rows * this.fieldSize;
    this.container.x = (window.innerWidth - this.width) / 2;
    this.container.y = (window.innerHeight - this.height) / 2 + 70;
  }

  animateFieldAppearance() {

    const delta = 0.2;
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const field = this.getField(row, col);

        const duration = Math.random() * 0.5;
        const delay = Math.random() * 0.5;

        field.appearanceAnimation(duration + delta, delay + delta);
      }
    }
  }

  animateFieldDisappearance() {
    let i = this.rows;
    for (let row = 0; row < this.rows; row++) {
    let j = this.cols;
      for (let col = 0; col < this.cols; col++) {
        const field = this.getField(row, col);
  
        if (field.tile) {
          field.tile.isDeleted = true;
          field.disAppearanceAnimation(j * 0.1, i *  0.05);
        }
        j++;
      }
      i--;
    }
  }
}
