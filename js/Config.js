const config = {
    tiles: [
      {
        type: "banana",
        sprite: Texture.from("../images/banana.png"),
      },
      {
        type: "coco",
        sprite: Texture.from("../images/coco.png"),
      },
      {
        type: "grape",
        sprite: Texture.from("../images/grape.png"),
      },
      {
        type: "lemon",
        sprite: Texture.from("../images/lemon.png"),
      },
      {
        type: "lime",
        sprite: Texture.from("../images/lime.png"),
      },
      {
        type: "pear",
        sprite: Texture.from("../images/pear.png"),
      },
    ],
  
    field: {
      rows: 8,
      cols: 8,
      cellSize: 60,
    },

    gameTime: 30,
  
    streakRules: [
      [
        { col: 1, row: 0 },
        { col: 2, row: 0 },
      ],
      [
        { col: 0, row: 1 },
        { col: 0, row: 2 },
      ],
    ],
  };
  