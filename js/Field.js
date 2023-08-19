class Field {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        this.sprite = new PIXI.Sprite(
            Texture.from("../images/box.png")
          );
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(0.465);

    }


    get position() {
        return {
            x: this.col * config.field.cellSize,
            y: this.row * config.field.cellSize
        };
    }

    setTile(tile) {
        this.tile = tile;
        tile.field = this;
        tile.setPosition(this.position);
    }
}