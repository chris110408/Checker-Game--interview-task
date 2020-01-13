const Service = require("egg").Service;

class GameService extends Service {
  // create======================================================================================================>
  async create(payload) {
    const { ctx, service } = this;

    return ctx.model.Game.create(payload);
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this;
    const game = await ctx.service.game.find(_id);
    if (!game) {
      ctx.throw(404, "user not found");
    }
    return ctx.model.Game.findByIdAndRemove(_id);
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this;
    const game = await ctx.service.game.find(_id);
    if (!game) {
      ctx.throw(404, "game not found");
    }
    return ctx.model.Game.findByIdAndUpdate(_id, payload);
  }

  // index======================================================================================================>
  async index() {
    const res = await this.ctx.model.Game.find({}).exec();

    return res;
  }

  async removes(payload) {
    return this.ctx.model.Game.remove({ _id: { $in: payload } });
  }

  async find(id) {
    return this.ctx.model.Game.findById(id);
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.Game.findByIdAndUpdate(id, values);
  }
}

module.exports = GameService;
