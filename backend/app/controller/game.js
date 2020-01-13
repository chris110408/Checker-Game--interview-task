const Controller = require("egg").Controller;

class GameController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.GameDataValidate = {
      isRedRound:'boolean',
      game:'array',
      childrens: {
        type: 'array',
        itemType: 'object',
        required: false,
        rule: {
          row: 'int',
          col: 'int',
          pieceColor: {type: 'string', required: false}
        }
      },
    }
  }

  // create game
  async create() {
    const { ctx, service } = this;
    ctx.validate(this.GameDataValidate)
    const payload = ctx.request.body || {};
    // call Service
    const res = await service.game.create(payload);
    // // res
    ctx.helper.success({ ctx, res });
  }
  // destroy
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.game.destroy(id);
    ctx.helper.success({ ctx });
  }

  // update game
  async update() {
    const { ctx, service } = this;
    ctx.validate(this.GameDataValidate)
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    await service.game.update(id, payload);
    ctx.helper.success({ ctx });
  }

  // single game
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.game.show(id);
    ctx.helper.success({ ctx, res });
  }

  // get game
  async index() {
    const { ctx, service } = this;
    const res = await service.game.index();
    ctx.helper.success({ ctx, res });
  }

  //remove
  async removes() {
    const { ctx, service } = this;
    // const payload = ctx.queries.id
    const { id } = ctx.request.body;
    const payload = id.split(",") || [];
    // call Service
    const result = await service.game.removes(payload);
    // response
    ctx.helper.success({ ctx });
  }
}

module.exports = GameController;
