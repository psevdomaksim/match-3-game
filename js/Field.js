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
      app.screen.width>config.mobileWidth 
      ? this.scale = 0.465
      : this.scale = 0.39
      this.sprite.scale.set(this.scale)


      this.selected = new PIXI.Sprite(
        Texture.from("../images/selected_box.png")
      );
      this.sprite.x = this.position.x;
      this.sprite.y = this.position.y;

      this.sprite.addChild(this.selected);
      this.selected.visible = false;
      this.selected.anchor.set(0.5);
      
  }
  appearanceAnimation(duration, delay){
    if (!this.sprite) return;

    
    gsap.fromTo([this.sprite,this.tile.sprite], duration,
      {

        pixi:{
          scale: 0
        }
      },
      {
        yoyo: true, 
        ease: "power1.out",
        delay: delay,
        pixi:{
          scale: this.scale
        }
      },

    );
  }


  disAppearanceAnimation(duration, delay){

    if(!this.tile) return
    let tl = gsap.timeline()
    let margin;
    app.screen.width>config.mobileWidth 
    ? margin = config.fieldMobile.cellSize
    : margin =0

    tl.to([this.sprite,this.tile.sprite], duration, 
      {
        ease: "bounce.out",
        yoyo: true, 
        delay: delay,
        pixi:{
          y:app.screen.height/2 + margin,
          
        }
      },
    );

    tl.to([this.sprite,this.tile.sprite], duration , 
      {
        ease: "bounce.out",
        yoyo: true, 
        delay: delay,
        pixi:{
          alpha: 0,
        }
      },
       delay/2 + 0.3,
    )

    

  }

  get position() {
    if(app.screen.width>config.mobileWidth){
        return {
            x: this.col * config.field.cellSize,
            y: this.row * config.field.cellSize
        }
    } else{
        return {
            x: this.col * config.fieldMobile.cellSize,
            y: this.row * config.fieldMobile.cellSize
        }
    }

     
  }

  unselect(){
    this.selected.visible = false;
  }
  select(){
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
    this.selected.visible = true;
  }

  setTile(tile) {
      this.tile = tile;
      tile.field = this;
      tile.setPosition(this.position);
  }
}