'use strict';
var models = require('../config/models');
var async = require('async');

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
        attributes: ['id', 'nombre'],
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
      var array_nuevos = [];
      return models.db.transaction(function (t) {
        var promises = [];
        eliminados.forEach(function(eliminado) {
          models.Departamento.destroy({
            where: {id: eliminado}
          }, {transaction: t});
        });
        editados.forEach(function(editado) {
          models.Departamento.update({
            nombre: editado['nombre']
          }, {
            where: {id: editado['id']}
          }, {transaction: t});
        });
        nuevos.forEach(function(nuevo) {
          var newPromises = models.Departamento.create({
            nombre: nuevo['nombre']
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
            'Se ha registrado los cambios en los departamentos', result
          ]
        };
        reply(JSON.stringify(rpta));
      }).catch(function (err) {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en guardar los departamentos',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
]
