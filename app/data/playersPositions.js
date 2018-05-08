/*
  Data structure:
  {
    interval: Number,
    player_positions: [
      [
        [Number, Number, Number],
        [Number, Number, Number],
        [Number, Number, Number],
        ...
      ],
      ...
    ]
  }

  Interval - time in milliseconds between each frame of players

  Each player_positions array element contains a frame
  of players positions.
  Each player position consists of 3 numbers: [id, x, y]
  id - players tag id (Number, max 2 digits)
  x - x position (from 0 to 1)
  y - y position (from 0 to 1)

  Position (0,0) is in the bottom-left.
 */
 export default {"interval":100,"player_positions":[[[1,0.506,0.648]],[[1,0.1,0.9]],[[1,0.4,0.2]],[[1,0.3,0.5]]]}