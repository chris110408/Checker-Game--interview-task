module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const GameSchema = new Schema({
    game: [
      [
        {
          row: { type: Number },
          col: { type: Number },
          pieceColor: { type: String, default: null }
        }
      ]
    ],
    isRedRound: Boolean
  });

  return mongoose.model("Game", GameSchema);
};
