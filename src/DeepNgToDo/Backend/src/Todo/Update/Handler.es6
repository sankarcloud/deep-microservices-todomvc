'use strict';

import DeepFramework from 'deep-framework';

export default class Handler extends DeepFramework.Core.AWS.Lambda.Runtime {

  /**
   * @param {Array} args
   */
  constructor(...args) {
    super(...args);
  }

  handle(request) {
    let deepDb     = DeepFramework.Kernel.container.get('db');
    let Todo    = deepDb.get('Todo');

    if (!request.data.Id || typeof request.data.Id !== 'string') {
      throw new InvalidArgumentException(request.data.Id, 'string');
    }

    Todo.updateItem(request.data.Id, request.data, function(err, todo) {
      if (err) {
        throw new DatabaseOperationException(err);
      }

      return this.createResponse(todo.get()).send();
    }.bind(this));
  }
}
