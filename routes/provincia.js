'use strict';
var models = require('../config/models');

module.exports = [
  {
    method: 'GET',
    path: 'listar/{departamento_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function(request, reply) {
      models.Provincia.findAll({
        attributes: ['id', 'nombre'],
        where: {
          departamento_id : request.params.departamento_id
        },
      }).then(function(departamentos) {
        reply(JSON.stringify(departamentos));
      }).catch((err) => {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en listar las provincias del departamento',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
]
