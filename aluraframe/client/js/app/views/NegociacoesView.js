'use strict';

System.register(['./View', '../helpers/DateHelper', '../controllers/NegociacaoController'], function (_export, _context) {
    "use strict";

    var View, DateHelper, currentInstance, _createClass, NegociacoesView;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_View2) {
            View = _View2.View;
        }, function (_helpersDateHelper) {
            DateHelper = _helpersDateHelper.DateHelper;
        }, function (_controllersNegociacaoController) {
            currentInstance = _controllersNegociacaoController.currentInstance;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacoesView', NegociacoesView = function (_View) {
                _inherits(NegociacoesView, _View);

                function NegociacoesView(elemento) {
                    _classCallCheck(this, NegociacoesView);

                    var _this = _possibleConstructorReturn(this, (NegociacoesView.__proto__ || Object.getPrototypeOf(NegociacoesView)).call(this, elemento));

                    elemento.addEventListener('click', function (event) {
                        if (event.target.nodeName == 'TH') {
                            currentInstance().ordena(event.target.textContent.toLowerCase());
                        }
                    });
                    return _this;
                }

                _createClass(NegociacoesView, [{
                    key: 'template',
                    value: function template(model) {
                        // Se o retorno não fosse uma template string, não poderíamos "identar" 
                        // o código desta forma
                        return '\n            <table class="table table-hover table-bordered">\n                <thead>\n                    <tr>\n                        <th>DATA</th>\n                        <th>QUANTIDADE</th>\n                        <th>VALOR</th>\n                        <th>VOLUME</th>\n                    </tr>\n                </thead>\n\n                <tbody>\n                    ' + model.negociacoes.map(function (n) {
                            // console.log(n);
                            // return n;
                            return '\n                            <tr>\n                                <td>' + DateHelper.dataParaTexto(n.data) + '</td>\n                                <td>' + n.quantidade + '</td>\n                                <td>' + n.valor + '</td>\n                                <td>' + n.volume + '</td>\n                            </tr>\n                        ';
                        }).join('') + '\n                </tbody>\n\n                <tfoot>\n                    <td>Totais dos Volumes </br>(diferentes formas)</td>\n                    <td>' + function () {

                            var total = 0;
                            model.negociacoes.forEach(function (n) {
                                return total += n.volume;
                            });
                            return total;
                            // Immediately-invoked function expression (IIFE)
                            // A função imediata. Recurso usado na criação de escopo em JavaScript
                            // Coloca um bloco na expressão, sendo executado imediatamente.
                        }() + '\n                    </td>\n                    <td>' + // De forma funcional
                        model.negociacoes.reduce(function (total, n) {
                            return total + n.volume;
                        }, 0.0) + ' \n                    </td>\n                    <td>\n                     ' +
                        //model.negociacoes.reduce((total,n) => total + n.volume, 0.0) 
                        model.volumeTotal + '\n                    </td>\n\n                </tfoot>\n            </table>';
                    }
                }]);

                return NegociacoesView;
            }(View));

            _export('NegociacoesView', NegociacoesView);
        }
    };
});
//# sourceMappingURL=NegociacoesView.js.map