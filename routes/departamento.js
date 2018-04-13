'use strict';
var models = require('../config/models');

module.exports = [
  {
    method: 'GET',
    path: 'listar',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function(request, reply) {
      models.Departamento.findAll({
        attributes: ['idd', 'nombre'],
      }).then(function(departamentos) {
        reply(JSON.stringify(departamentos));
      }).catch((err) => {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en listar los departamentos',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
]
