class Tile {
  constructor() {
    const info = config.tiles[Math.floor(Math.random() * config.tiles.length)];

    this.type = info.type;
    this.sprite = new PIXI.Sprite(info.sprite);

    this.sprite.zIndex = 1;
    this.sprite.cursor = "pointer"
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.45);
  }

  setPosition(position) {
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  
  select() {
    gsap.to(this.sprite, {
        duration: 0.1,
        pixi: {
          scale: 0.5,
        },
      });
}

unselect() {
    this.sprite.scale.set(0.4);
}


  moveTo(position, duration, delay, ease) {
    return new Promise((resolve) => {
      gsap.to(this.sprite, {
        duration,
        delay,
        ease,
        pixi: {
          x: position.x,
          y: position.y,
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }
  isNeighbour(tile) {
    return (
      Math.abs(this.field.row - tile.field.row) +
        Math.abs(this.field.col - tile.field.col) ===
      1
    );
  }

  remove() {
    if (!this.sprite) {
      return;
    }
    this.sprite.destroy();
    this.sprite = null;
    if (this.field) {
      this.field.tile = null;
      this.field = null;
    }
  }

  fallDownTo(position, delay) {
    return this.moveTo(position, 0.3, delay, "circ.out");
  }
}
