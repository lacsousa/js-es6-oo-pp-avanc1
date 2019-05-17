"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind =

// ... Dessa forma é o REST Operator e não o Spread
function Bind(model, view) {
    _classCallCheck(this, Bind);

    for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        props[_key - 2] = arguments[_key];
    }

    var proxy = ProxyFactory.create(model, props, function (model) {
        view.update(model);
    });

    view.update(model);
    // Em JS um construtor pode retornar algo diferente do que 
    // uma referência para a Classe
    return proxy;
};
//# sourceMappingURL=Bind.js.map