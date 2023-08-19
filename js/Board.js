class Board {
    constructor() {
        this.container = new PIXI.Container();

        this.fields = [];
        this.rows = config.field.rows;
        this.cols = config.field.cols;

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
        this.animateFieldAppearance();

    }

    createTiles() {
        this.fields.forEach(field => this.createTile(field));
    }

    createTile(field) {
        const tile = new Tile();
        field.setTile(tile);
        this.container.addChild(tile.sprite);

        tile.sprite.interactive = true;
        tile.sprite.on("pointerdown", () => {
            this.container.emit('tile-touch-start', tile);
        });

        return tile;
    }

    getField(row, col) {
        return this.fields.find(field => field.row === row && field.col === col);
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
        gsap.fromTo(
          this.container,
    
          {
            pixi: {
              scale: 0,
            },
          },
          {
            pixi: {
              scale: 1,
            },
          }
        );
      }

      animateFieldDisappearance() {
        gsap.fromTo(
          this.container,
    
          {
            pixi: {
              scale: 1,
            },
          },
          {
            pixi: {
              scale: 0,
            },
          }
        );
      }

    swap(tile1, tile2) {
        const tile1Field = tile1.field;
        const tile2Field = tile2.field;

        tile1Field.tile = tile2;
        tile2.field = tile1Field;

        tile2Field.tile = tile1;
        tile1.field = tile2Field;
    }


}