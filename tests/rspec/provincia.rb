# encoding: utf-8
require_relative 'app'
require 'json'

def listar
  RSpec.describe App do
    describe '1. Listar provincias: ' do
      it '1.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '1.2 Listar provincias' do
        url = 'provincia/listar'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
    end
  end
end

def guardar
  RSpec.describe App do
    describe '2. Crear provincias: ' do
      it '2.1 Conexión con backend' do
        url = 'test/conexion'
        test = App.new(url)
        test.get()
        expect(test.response.code).to eq(200)
      end
      it '2.2 Crear provincias' do
        data = {
          :nuevos => [
            {
              :id => 'tablaDepartamento_481',
              :nombre => 'Departameñtó N1',
            },
            {
              :id => 'tablaDepartamento_482',
              :nombre => 'Departameñtó N2',
            },
          ],
          :editados => [
            {
              :id => '195',
              :nombre => 'Amazonasssss',
            },
            {
              :id => '196',
              :nombre => 'Ancsjjjj',
            },
          ],
          :eliminados => [197,198],
          :extra => {
            :departamento_id => 20
          }
        }.to_json
        url = 'provincia/guardar?data=' + data
        test = App.new(url)
        test.post()
        puts test.response.body
        expect(test.response.code).to eq(200)
        expect(test.response.body).not_to include('error')
        expect(test.response.body).to include('Se ha registrado los cambios en las provincias')
        expect(test.response.body).to include('nuevo_id')
        expect(test.response.body).to include('success')
      end
    end
  end
end
#listar
guardar
