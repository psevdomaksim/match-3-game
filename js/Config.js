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
      // {
      //   type: "head",
      //   sprite: Texture.from("../images/head.png"),
      // },
      // {
      //   type: "head2",
      //   sprite: Texture.from("../images/head2.png"),
      // },
      // {
      //   type: "head3",
      //   sprite: Texture.from("../images/head3.png"),
      // },
      // {
      //   type: "head4",
      //   sprite: Texture.from("../images/head4.png"),
      // },
      // {
      //   type: "head5",
      //   sprite: Texture.from("../images/head5.png"),
      // },
      // {
      //   type: "head6",
      //   sprite: Texture.from("../images/head6.png"),
      // },
    ],
  
    field: {
      rows: 8,
      cols: 8,
      cellSize: 60,
    },

    fieldMobile: {
      rows: 6,
      cols: 6,
      cellSize: 50,
    },

    mobileWidth: 500,

    gameTime: 30,
  
    // streakRules: [
    //   [
    //     { col: 1, row: 0 },
    //     { col: 2, row: 0 },
    //   ],
    //   [
    //     { col: 0, row: 1 },
    //     { col: 0, row: 2 },
    //   ],
    // ],
  };
  