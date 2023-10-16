class Interface {
  constructor(board) {
    this.board = board;
    this.seconds = config.gameTime;
  }

  #fillGameText() {
    this.gameText = new PIXI.Sprite(Texture.from("../images/text.png"));
    this.gameText.anchor.set(0.5);

    if (app.screen.width > config.mobileWidth) {
      this.gameText.scale.set(0.45);
      this.gameText.x = app.screen.width / 2 - 40;
      this.gameText.y = app.screen.height / 2 - 275;
    } else {
      this.gameText.scale.set(0.36);
      this.gameText.x = app.screen.width / 2 - 40;
      this.gameText.y = app.screen.height / 2 - 180;
    }

    app.stage.addChild(this.gameText);
  }

  #fillTimerIcon() {
    this.timer = new PIXI.Sprite(Texture.from("../images/timer.png"));

    this.timer.anchor.set(0.5);
    this.timer.scale.set(0.45);
    if (app.screen.width > config.mobileWidth) {
      this.timer.x = app.screen.width / 2 + 160;
      this.timer.y = app.screen.height / 2 - 280;
    } else {
      this.timer.x = app.screen.width / 2 + 120;
      this.timer.y = app.screen.height / 2 - 190;
    }

    app.stage.addChild(this.timer);
  }

  #fillTimer() {
    let fontSize;

    app.screen.width > 500 ? (fontSize = 32) : (fontSize = 28);

    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize,
      fontWeight: "bold",
      fill: ["#ffffff"],
      stroke: "#2a8e00",
      strokeThickness: 6,
    });

    this.timerText = new PIXI.Text(`00:${ this.seconds}`, style);
    this.timerText.anchor.set(0.5);

    if (app.screen.width > config.mobileWidth) {
      this.timerText.x = app.screen.width / 2 + 160;
      this.timerText.y = app.screen.height / 2 - 220;
    } else {
      this.timerText.x = app.screen.width / 2 + 120;
      this.timerText.y = app.screen.height / 2 - 130;
    }

    app.stage.addChild(this.timerText);

    const timer = setInterval(() => {
      if ( this.seconds === 0) {
        clearInterval(timer);

        this.board.animateFieldDisappearance();
        this.hideText();
        this.showGameOverInfo();
      } else {
        if ( this.seconds >= 10) {
          this.timerText.text = `00:${ this.seconds}`;
        } else {
          this.timerText.text = `00:0${ this.seconds}`;
        }
      }
      -- this.seconds;
    }, 1000);
  }

  showGameOverInfo() {

    let flag = 0;
    const timer = setInterval(() => {
      ++flag;
      if (flag) clearInterval(timer);
      this.createPlayButton();
     // this.createPlayText();
      this.createGameOverText();
      this.playButtonAnimation();

      this.showGameOverInterface();
    }, 750);
  }

  showGameOverInterface() {
    const duration = 1;

    gsap.fromTo(
      [this.gameOverText, this.playButton],
      duration,
      {
        pixi: {
          alpha: 0,
        },
      },
      {
        pixi: {
          alpha: 1,
        },
      }
    );


    // gsap.fromTo(
    //   this.playText,
    //   duration,
    //   {
    //     pixi: {
    //       alpha: 0,
    //     },
    //   },
    //   {
    //     pixi: {
    //       alpha: 1,
    //     },
    //   }
    // );
  }

  #fillBackground() {
    const background = new PIXI.Sprite(
      Texture.from("../images/background.jpg")
    );

    background.anchor.set(0.5);

    app.screen.width > config.mobileWidth;
    (background.width = config.field.cols * config.field.cellSize + 20),
      (background.height = 700);

    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    background.zIndex = -1;
    app.stage.addChild(background);
  }

  fillScreenBg() {
    const screenBg = new PIXI.Sprite(Texture.from("../images/bg.png"));
    screenBg.width = window.innerWidth;
    screenBg.height = window.innerHeight;
    app.stage.addChild(screenBg);
  }

  createPlayButton() {
    this.playButton = new PIXI.Sprite(Texture.from("../images/playButton.png"));
    this.playButton.anchor.set(0.5);
    this.playButton.scale.set(0.4);
    this.playButton.cursor = "pointer";
    this.playButton.x = app.screen.width / 2;
    this.playButton.y = app.screen.height / 2 + 50;
    app.stage.addChild(this.playButton);
  }

  playButtonAnimation() {
    let duration = 0.7;
    //button
    gsap.to(
      this.playButton,

      {
        duration,
        yoyo: true,
        repeat: -1,
        pixi: {
          scale: 0.35,
        },
      }
    );

    // //text
    // gsap.to(
    //   this.playText,

    //   {
    //     yoyo: true,
    //     duration,
    //     repeat: -1,
    //     pixi: {
    //       scale: 0.9,
    //     },
    //   }
    // );
  }

  // createPlayText() {
  //   const style = new PIXI.TextStyle({
  //     fontFamily: "Arial",
  //     fontSize: 50,
  //     fontWeight: "bold",
  //     fill: ["#ffffff"],
  //   });

  //   this.playText = new PIXI.Text(`PLAY`, style);
  //   this.playText.anchor.set(0.5);
  //   this.playText.cursor = "pointer";
  //   this.playText.x = app.screen.width / 2;
  //   this.playText.y = app.screen.height / 2 + 50;
  //   app.stage.addChild(this.playText);
  // }

  createGameOverText() {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 66,
      fontWeight: "bold",
      fill: ["#ffffff"],
      stroke: "#2a8e00",
      strokeThickness: 8,
    });

    this.gameOverText = new PIXI.Text(`Game over`, style);
    this.gameOverText.anchor.set(0.5);
    this.gameOverText.x = app.screen.width / 2;
    this.gameOverText.y = app.screen.height / 2 - 100;
    app.stage.addChild(this.gameOverText);
  }

  hideText() {
    gsap.to([this.gameText, this.timerText, this.timer], {
      pixi: {
        alpha: 0,
      },
    });

    this.timer = null;
    this.timerText = null;
    this.gameText = null;
  }

  render() {
    this.fillScreenBg();
    this.#fillBackground();
    this.#fillGameText();
    this.#fillTimerIcon();
    this.#fillTimer();
  }
}
