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
    handler: function(request, reply) {
      var data = JSON.parse(request.query.data);
      var nuevos = data['nuevos'];
      var editados = data['editados'];
      var eliminados = data['eliminados'];
      var array_nuevos = [];
      async.each(nuevos, function(nuevo, callback){
        models.Departamento.create({
          nombre: nuevo['nombre'],
        }).then(departamento => {
          var temp = {'temporal': nuevo['id'] ,'nuevo_id': departamento['id']};
          array_nuevos.push(temp);
          callback();
        }).catch(error => {
          callback(err);
          return;
        })
      }, function(err){
        if(err){
          var rpta = {
            'tipo_mensaje': 'error',
            'mensaje': [
              'Se ha producido un error en guardar los departamentos',
              err.toString()
            ]
          }
          reply(JSON.stringify(rpta));
        }else{
          var rpta = {
            'tipo_mensaje': 'success',
            'mensaje': [
              'Se ha registrado los cambios en los departamentos',
              array_nuevos
            ]
          }
          reply(JSON.stringify(rpta));
        }
      });
    },
  },
      /*
      return models.db.transaction(function (t) {

        }, function(err){
          if(err){
            var rpta = {
              'tipo_mensaje': 'error',
              'mensaje': [
                'Se ha producido un error en eliminar los ambientes',
                err.toString()
              ]
            };
            t.rollback();
            reply(JSON.stringify(rpta));
          }else{
            var rpta = {
              'tipo_mensaje': 'success',
              'mensaje': [
                'Se ha registrado los cambios en los ambientes',
              ]
            };
            t.commit();
            reply(JSON.stringify(rpta));
          }
        });
        /*
        nuevos.forEach(function(nuevo) {
          return models.Departamento.create({
            nombre: nuevo['nombre'],
            },
            {
              transaction: t
            }).then(function(row){
              console.log("1 ++++++++++++++++++++++++++");
              console.log(row);
              console.log("2 ++++++++++++++++++++++++++");
            });
         });
         editados.forEach(function(editado) {
           models.Departamento.update({
             nombre: editado['nombre'],
           }, {
             where: {
               id: editado['id']
             }
           }, {
             transaction: t
           }).then(function(row){
           });
         });
        eliminados.forEach(function(eliminado) {
          models.Departamento.destroy({
            where: {
              id: eliminado
            }
          }, {
            transaction: t
          });
        });
      }).then(function() {
        var rpta = {
          'tipo_mensaje' :  'success',
          'mensaje' : [
            "Se ha registrado los cambios en los departamentos",
            result
          ]
        };
        t.commit();
        reply(JSON.stringify(rpta));
      }).catch(function (err) {
        var rpta = {
          'tipo_mensaje': 'error',
          'mensaje': [
            'Se ha producido un error en guardar los departamentos',
            err.toString()
          ]
        };
        t.rollback();
        reply(JSON.stringify(rpta)).code(500);
      });
      */
]
