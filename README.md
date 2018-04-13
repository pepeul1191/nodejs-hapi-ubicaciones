## HapiJS NodeJS y SQlite3

Instlación de software y dependencias:

    $ npm install && npm install -g nodemon bower && bower install

Arrancar servicio:

    $ nodejs app.js

Arrancer servicio con autoreload con cambios:

    $ nodemon app.js

### Migraciones

Ejecutar migración

    $ sequel -m db/migrations -M #version postgres://host/database
    $ sequel -m db/migrations -M #version sqlite://db/gestion.db
    $ sequel -m db/migrations -M #version mysql://root:123@localhost/gestion

Ejecutar el 'down' de las migraciones de la última a la primera:

    $ sequel -m db/migrations -M 0 mysql://root:123@localhost/gestion

Ejecutar el 'up' de las migraciones hasta un versión especifica:

    $ sequel -m db/migrations -M #version mysql://root:123@localhost/gestion

Crear Vista de distrito/provincia/departamento

    MySQL
    >> CREATE VIEW vw_distrito_provincia_departamento AS select DI.id AS id, PA.id AS pais_id, concat(DI.nombre,', ',PR.nombre,', ',DE.nombre) AS nombre from ((distritos DI join provincias PR on((DI.provincia_id = PR.id))) join departamentos DE on((PR.departamento_id = DE.id))) join paises PA on((DE.pais_id = PA.id)) limit 2000;
    SQLite
    >> CREATE VIEW vw_distrito_provincia_departamentos AS select DI.id AS id,  DI.nombre || ', '  || PR.nombre || ', '  || DE.nombre AS nombre
from distritos DI join provincias PR on DI.provincia_id = PR.id join departamentos DE on PR.departamento_id = DE.id limit 2000;

Tipos de Datos de Columnas

+ :string=>String
+ :integer=>Integer
+ :date=>Date
+ :datetime=>[Time, DateTime].freeze,
+ :time=>Sequel::SQLTime,
+ :boolean=>[TrueClass, FalseClass].freeze,
+ :float=>Float
+ :decimal=>BigDecimal
+ :blob=>Sequel::SQL::Blob

---

Fuentes:

+ http://mongoosejs.com/docs/models.html
+ https://github.com/davidenq/hapi-routes-loader
+ https://stackoverflow.com/questions/7653080/adding-to-an-array-asynchronously-in-node-js
+ https://stackoverflow.com/questions/31331606/how-can-i-add-a-middleware-in-my-route
+ https://hapijs.com/tutorials/routing?lang=en_US
