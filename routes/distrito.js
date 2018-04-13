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
  {
    method: 'POST',
    path: 'guardar',
    config: {
      auth: false,
      pre: [
      ],
    },
    handler: async function(request, reply) {
      var data = JSON.parse(request.query.data);
      var nuevos = data['nuevos'];
      var editados = data['editados'];
      var eliminados = data['eliminados'];
      var eliminados = data['eliminados'];
      var provincia_id = data['extra']['provincia_id'];
      var array_nuevos = [];
      return models.db.transaction(function (t) {
        var promises = [];
        eliminados.forEach(function(eliminado) {
          models.Distrito.destroy({
            where: {id: eliminado}
          }, {transaction: t});
        });
        editados.forEach(function(editado) {
          models.Distrito.update({
            nombre: editado['nombre']
          }, {
            where: {id: editado['id']}
          }, {transaction: t});
        });
        nuevos.forEach(function(nuevo) {
          var newPromises = models.Distrito.create({
            nombre: nuevo['nombre'],
            provincia_id: provincia_id,
          }, {transaction: t});
            promises.push(newPromises);
         });
        return Promise.all(promises).then(function(nuevos_promises) {
          var promises = [];
          var i = 0;
          nuevos_promises.forEach(function(promise){
            var temp = {
              'temporal': nuevos[i]['id'] ,
              'nuevo_id': promise['id']
            };
            promises.push(temp);
            i = i + 1;
          });
          return Promise.all(promises);
        });
      }).then(function (result) {
        var rpta = {
          'tipo_mensaje': 'success',
          'mensaje': [
            'Se ha registrado los cambios en los distritos', result
          ]
        };
        reply(JSON.stringify(rpta));
      }).catch(function (err) {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en guardar los distritos',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
]
