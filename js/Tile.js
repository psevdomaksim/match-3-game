class Tile {
  constructor(game) {
    const info = config.tiles[Math.floor(Math.random() * config.tiles.length)];

    this.game = game;

    this.type = info.type;
    this.sprite = new PIXI.Sprite(info.sprite);

    this.sprite.zIndex = 1;
    this.sprite.cursor = "pointer";

    this.sprite.anchor.set(0.5);


    app.screen.width > config.mobileWidth
      ? this.scale = 0.45
      : this.scale = 0.36;

      this.sprite.scale.set(this.scale);
  }




  setPosition(position) {
    this.sprite.x = position.x;
    this.sprite.y = position.y;
  }

  select() {

    gsap.to(
      this.sprite,

      {
        duration: 0.07,
        yoyo: true,
        repeat: 1,
        pixi: {
          scale: this.scale - 0.05,
        },
      }
    );
  }

  unselect() {
    this.sprite.scale.set(this.scale);
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
  isTheSameType(tile) {
    return this.field.tile.type === tile.type;
  }

  remove() {
    return new Promise((resolve) => {
      if (!this.sprite) {
        return;
      }
      const position = { x: this.sprite.x, y: this.sprite.y };
      this.field.tile.isDeleted = true;
      this.sprite.cursor = "";

      gsap.to(this.sprite, {
        duration: 0.25,
        pixi: {
          alpha: 0,
        },
      });

      gsap.to(this.field.sprite, {
        duration: 0.25,
        pixi: {
          alpha: 0,
        },
      });

      

      // gsap.to(this.sprite, { duration: 0.5, opacity: 0 });
      this.moveTo(position, 0.5, 0, "circ.out")
        .then(() => {
          this.sprite.destroy();
          this.sprite = null;
          if (this.field) {
            this.field.tile = null;
            this.field.sprite.destroy();
           

            this.field = null;
          }

          this.game.board.isEmpty();

        })

        
        // .then(() => {
        //   this.game.processFallDown().then(()=>{
        //     this.game.addTiles()
        //   });
        // });
      resolve();
    });

    
  }

  removeWithoutAnimation(){
    if (!this.sprite) {
      return;
    }

    this.field.tile.isDeleted = true;
    this.sprite.cursor = "";

    this.sprite.destroy();
    this.sprite = null;
    if (this.field) {
      this.field.tile = null
      this.field = null;
    }
  }

  fallDownTo(position, delay) {
    return this.moveTo(position, 0.3, delay, "circ.out");
  }
}
