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
      }).then(function(provincias) {
        reply(JSON.stringify(provincias));
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
      var departamento_id = data['extra']['departamento_id'];
      var array_nuevos = [];
      return models.db.transaction(function (t) {
        var promises = [];
        eliminados.forEach(function(eliminado) {
          models.Provincia.destroy({
            where: {id: eliminado}
          }, {transaction: t});
        });
        editados.forEach(function(editado) {
          models.Provincia.update({
            nombre: editado['nombre']
          }, {
            where: {id: editado['id']}
          }, {transaction: t});
        });
        nuevos.forEach(function(nuevo) {
          var newPromises = models.Provincia.create({
            nombre: nuevo['nombre'],
            departamento_id: departamento_id,
          }, {transaction: t});
            promises.push(newPromises);
         });
        return Promise.all(promises).then(function(nuevos_promises) {
          var promises = [];
          var i = 0;
          nuevos_promises.forEach(function(promise){
            var temp = {'temporal': nuevos[i]['id'] ,'nuevo_id': promise['id']};
            promises.push(temp);
            i = i + 1;
          });
          return Promise.all(promises);
        });
      }).then(function (result) {
        var rpta = {
          'tipo_mensaje': 'success',
          'mensaje': [
            "Se ha registrado los cambios en las provincias", result
          ]
        };
        reply(JSON.stringify(rpta));
      }).catch(function (err) {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en guardar las provincias',
            err.toString()
          ]
        }
        reply(JSON.stringify(rpta)).code(500);
      });
    }
  },
]
