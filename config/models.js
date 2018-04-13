const Sequelize = require('sequelize');
var database = require('./database');
var db = database.db;

const Departamento = db.define('departamentos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.STRING, allowNull: false,  },
});

const Provincia = db.define('provincias', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.TEXT, allowNull: false, },
	departamento_id: { type: Sequelize.INTEGER, references: {
		model: Departamento, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

const Distrito = db.define('distritos', {
	id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	nombre: { type: Sequelize.TEXT, allowNull: false, },
	provincia_id: { type: Sequelize.INTEGER, references: {
		model: Provincia, key: 'id', deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
	}},
});

//const DistritoProvinciaDepartamento = db.define('vw_distrito_provincia_departamento', {
	//id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
	//nombre: { type: Sequelize.STRING },
//});

exports.db = db;
exports.Departamento = Departamento;
exports.Provincia = Provincia;
exports.Distrito = Distrito;
//exports.DistritoProvinciaDepartamento = DistritoProvinciaDepartamento;
