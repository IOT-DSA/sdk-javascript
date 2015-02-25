var DS = require('../index.js');

var provider = new DS.NodeProvider();

var action = new DS.Action(function(node, params) {
  node.value = new DS.Value(true);
});

provider.load({
  locker1: {
    open: {
      '$invokable': 'read',
      '?invoke': action
    },
    opened: {
      '$type': 'bool',
      '?value': false
    }
  },
  locker2: {
    open: {
      '$invokable': 'read',
      '?invoke': action
    },
    opened: {
      '$type': 'bool',
      '?value': false
    }
  }
});

provider.root.attribute('hello', 'hello world');

var responder = new DS.Responder(new DS.WebSocketClient('test', 'http://localhost:8080'), provider);
