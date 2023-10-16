class Game {
  constructor() {
    this.container = new PIXI.Container();

    this.container.sortableChildren = true;

    this.selectedTiles = new Set();

    this.board = new Board(this);
    this.interface = new Interface(this.board);
    this.streakManager = new StreakManager(this.board);

    this.container.addChild(this.board.container);
    this.board.container.on("tile-touch-start", this.onTileClick.bind(this));

    this.tileTypesCount = {};

    this.render();
  }

  render() {
    this.interface.render();
    app.stage.addChild(this.container);

    this.board.render();

    this.isFieldColleted();
  }



  removeMatches(matches) {
    matches.forEach((match) => {
      match.forEach((tile) => {
        tile.remove();
      });
    });
  }

  isFieldColleted() {
    let unbalancedTiles = [];

    //подсчитывает количество каждой картинки
    config.tiles.forEach((tile) => {
      let count = this.board.fields.filter(
        (field) => field.tile.type == tile.type
      ).length;

      this.tileTypesCount[`${tile.type}`] = count;
    });

    //ищет те, которые некратны трем и удаляет по одному экземпляру
    for (var tile in this.tileTypesCount) {
      if (this.tileTypesCount[tile] % 3 != 0) {
        unbalancedTiles.push(tile);
        let firstField = this.board.fields.find(
          (field) => field.tile?.type == tile
        );
        firstField.tile.removeWithoutAnimation();
      }
    }

    //добавляются новые картинки на месте удаленных
    const fields = this.board.fields.filter((field) => field.tile === null);

    fields.forEach((field) => {
      this.board.createTile(field);
    });

    //проверка на то остались ли еще несбалансированные
    if (unbalancedTiles.length <= 1) {
      this.board.animateFieldAppearance();
      return;
    }

    //повтор рекурсии
    this.isFieldColleted();
  }

  onTileClick(tile) {
    if (tile.isDeleted || this.interface.seconds === 0) {
      return;
    }
    if (this.selectedTile) {
      if (!this.selectedTile.isTheSameType(tile)) {
        this.clearSelections();
        this.selectTile(tile);
      } else {
        this.selectTile(tile);
      }
    } else {
      this.selectTile(tile);
    }
  }

  clearSelections() {
    this.selectedTiles.forEach((tile) => {
      tile.field.unselect();
      tile.unselect();
    });

    this.selectedTiles.clear();
    this.selectedTile = null;
  }

  removeStreak() {
    this.selectedTiles.forEach((tile) => {
      tile.remove();
    });

    this.selectedTiles.clear();
    this.selectedTile = null;
  }

  selectTile(tile) {
    this.selectedTiles.add(tile);

    this.selectedTile = tile;

    this.selectedTile.select();
    this.selectedTile.field.select();

    if (this.selectedTiles.size == 3) {
      this.removeStreak();

      return;
    }
  }

  /////////////////////////////////////////
  fallDownTo(emptyField) {
    for (let row = emptyField.row - 1; row >= 0; row--) {
      let fallingField = this.board.getField(row, emptyField.col);

      if (fallingField.tile) {
        const fallingTile = fallingField.tile;
        fallingTile.field = emptyField;
        emptyField.tile = fallingTile;
        fallingField.tile = null;
        return fallingTile.fallDownTo(emptyField.position);
      }
    }

    return Promise.resolve();
  }

  processFallDown() {
    return new Promise((resolve) => {
      let completed = 0;
      let started = 0;

      for (let row = this.board.rows - 1; row >= 0; row--) {
        for (let col = this.board.cols - 1; col >= 0; col--) {
          const field = this.board.getField(row, col);

          if (!field.tile) {
            ++started;
            this.fallDownTo(field).then(() => {
              ++completed;
              if (completed >= started) {
                resolve();
              }
            });
          }
        }
      }
    });
  }

  addTiles() {
    return new Promise((resolve) => {
      const fields = this.board.fields.filter((field) => field.tile === null);
      let total = fields.length;
      let completed = 0;

      fields.forEach((field) => {
        const tile = this.board.createTile(field);
        tile.sprite.y = -500;
        const delay = (Math.random() * 2) / 10 + 0.3 / (field.row + 1);
        tile.fallDownTo(field.position, delay).then(() => {
          ++completed;
          if (completed >= total) {
            resolve();
          }
        });
      });
    });
  }
}

const game = new Game();
