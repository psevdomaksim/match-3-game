class Interface {
  constructor(board) {
    this.board = board;
  }

  #fillGameText() {
    this.gameText = new PIXI.Sprite(Texture.from("../images/text.png"));
    this.gameText.anchor.set(0.5);
    this.gameText.scale.set(0.45);
    this.gameText.x = app.screen.width / 2 - 40;
    this.gameText.y = app.screen.height / 2 - 275;

    app.stage.addChild(this.gameText);
  }

  #fillTimerIcon() {
    this.timer = new PIXI.Sprite(Texture.from("../images/timer.png"));

    this.timer.anchor.set(0.5);
    this.timer.scale.set(0.45);
    this.timer.x = app.screen.width / 2 + 160;
    this.timer.y = app.screen.height / 2 - 280;

    app.stage.addChild(this.timer);
  }

  #fillTimer() {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 32,
      fontWeight: "bold",
      fill: ["#ffffff"],
      stroke: "#2a8e00",
      strokeThickness: 6,
    });
    let seconds = config.gameTime;

    this.timerText = new PIXI.Text(`00:${seconds}`, style);
    this.timerText.anchor.set(0.5);
    this.timerText.x = app.screen.width / 2 + 160;
    this.timerText.y = app.screen.height / 2 - 220;
    app.stage.addChild(this.timerText);

    const timer = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(timer);

        this.board.animateFieldDisappearance();
        this.hideText();
        this.showGameOverInfo();
      } else {
        if (seconds >= 10) {
          this.timerText.text = `00:${seconds}`;
        } else {
          this.timerText.text = `00:0${seconds}`;
        }
      }
      --seconds;
    }, 1000);
  }

  #fillBackground() {
    const background = new PIXI.Sprite(
      Texture.from("../images/background.jpg")
    );

    background.anchor.set(0.5);
    background.width = config.field.cols * config.field.cellSize + 20;
    background.height = 700;
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;
    background.zIndex = -1;
    app.stage.addChild(background);
  }

  createPlayButton() {
    this.playButton = new PIXI.Sprite(Texture.from("../images/button.png"));
    this.playButton.anchor.set(0.5);
    this.playButton.scale.set(0.4);
    this.playButton.cursor = "pointer";
    this.playButton.x = app.screen.width / 2;
    this.playButton.y = app.screen.height / 2 + 50;
    app.stage.addChild(this.playButton);
  }

  playButtonAnimation() {
    let flag = 1;
    let duration = 0.7;
    setInterval(() => {
      if (flag) {
        //button
        gsap.fromTo(
          this.playButton,

          {
            pixi: {
              scale: 0.4,
            },
          },
          {
            pixi: {
              scale: 0.35,
            },
            duration,
          }
        );

        //text
        gsap.fromTo(
          this.playText,

          {
            pixi: {
              scale: 1,
            },
          },
          {
            pixi: {
              scale: 0.9,
            },
            duration,
          }
        );

        flag--;
      } else {
        //button
        gsap.fromTo(
          this.playButton,
          {
            pixi: {
              scale: 0.35,
            },
          },
          {
            pixi: {
              scale: 0.4,
            },
            duration,
          }
        );

        //text
        gsap.fromTo(
          this.playText,
          {
            pixi: {
              scale: 0.9,
            },
          },
          {
            pixi: {
              scale: 1,
            },
            duration,
          }
        );
        flag++;
      }
    }, duration * 1000);
  }

  createPlayText() {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 50,
      fontWeight: "bold",
      fill: ["#ffffff"],
    });

    this.playText = new PIXI.Text(`PLAY`, style);
    this.playText.anchor.set(0.5);
    this.playText.cursor = "pointer";
    this.playText.x = app.screen.width / 2;
    this.playText.y = app.screen.height / 2 + 50;
    app.stage.addChild(this.playText);
  }

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

  showGameOverInfo() {
    this.createPlayButton();
    this.createPlayText();
    this.createGameOverText();
    this.playButtonAnimation();
  }

  hideText() {
    gsap.fromTo(
      this.gameText,
      {
        pixi: {
          scale: 0.45,
        },
      },
      {
        pixi: {
          scale: 0,
        },
      }
    );

    gsap.fromTo(
      this.timerText,
      {
        pixi: {
          scale: 0.45,
        },
      },
      {
        pixi: {
          scale: 0,
        },
      }
    );

    gsap.fromTo(
      this.timer,
      {
        pixi: {
          scale: 0.45,
        },
      },
      {
        pixi: {
          scale: 0,
        },
      }
    );

    this.timer = null;
    this.timerText = null;
    this.gameText = null;
  }

  render() {
    this.#fillBackground();
    this.#fillGameText();
    this.#fillTimerIcon();
    this.#fillTimer();
  }
}
