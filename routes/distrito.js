'use strict';
var models = require('../config/models');

module.exports = [
  {
    method: 'GET',
    path: 'listar/{provincia_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function(request, reply) {
      models.Distrito.findAll({
        attributes: ['id', 'nombre'],
        where: {
          provincia_id : request.params.provincia_id
        },
      }).then(function(distritos) {
        reply(JSON.stringify(distritos));
      }).catch((err) => {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en listar los distritos de la provincia',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
  {
    method: 'GET',
    path: 'buscar',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function(request, reply) {
      models.DistritoProvinciaDepartamento.findAll({
        attributes: ['id', 'nombre'],
        where: {
          nombre : {
            $like: request.query.nombre + '%'
          }
        },
        limit: 10,
      }).then(function(distritos) {
        reply(JSON.stringify(distritos));
      }).catch((err) => {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en buscar los distritos',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
  {
    method: 'GET',
    path: 'nombre/{distrito_id}',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: function(request, reply) {
      models.DistritoProvinciaDepartamento.findOne({
        attributes: ['id', 'nombre'],
        where: {
          id : request.params.distrito_id
        },
      }).then(function(distritos) {
        reply(JSON.stringify(distritos));
      }).catch((err) => {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en obtener el distrito',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
]
