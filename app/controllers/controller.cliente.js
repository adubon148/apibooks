const db = require('../config/db.config.js');
const Cliente = db.cliente;

exports.create = (req, res) => {
    let cliente = {};

    try{
        
        cliente.dpi = req.body.dpi;
        cliente.nombre = req.body.nombre;
        cliente.apellido = req.body.apellido;
        cliente.edad = req.body.edad;
        cliente.direccion = req.body.direccion;
        cliente.Nacionalidad = req.body.Nacionalidad;
        cliente.telefono = req.body.telefono;
        cliente.email = req.body.email;
        cliente.estadocivil = req.body.estadocivil;
        cliente.nit = req.body.nit;
        
        
        Cliente.create(cliente).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente el cliente con DPI: " + result.dpi,
                cliente: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllclients = (req, res) => {
    
    Cliente.findAll()
        .then(clientesInfos => {
            res.status(200).json({
                message: "se han obtenido todos los clientes con exito!",
                clientes: clientesInfos
            });
        })
        . catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getClienteById = (req, res) => {
 
  let id = req.params.dpi;
  Cliente.findByPk(id)
      .then(cliente => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente el cliente con ID: = " + id,
              cliente: cliente
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}



exports.updateById = async (req, res) => {
    try{
        let clienteid = req.params.dpi;
        let cliente = await Libro.findByPk(clienteid);
    
        if(!cliente){
            // return a response to client
            res.status(404).json({
                message: "No se ha encontrado el cliente con ID = " + clienteid,
                cliente: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                dpi: req.body.dpi,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                edad:req.body.edad,
                direccion: req.body.direccion,
                Nacionalidad: req.body.Nacionalidad,
                telefono: req.body.telefono,
                estadocivil: req.body.estadocivil,
                email: req.body.email,
                nit: req.body.nit,
            }
            let result = await Cliente.update(updatedObject, {returning: true, where: {dpi: clienteid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar cliente con id = " + req.params.dpi,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "actualizacion exitosa de libro con id = " + clienteid,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> no se puede editar libro con id = " + req.params.dpi,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let clienteid = req.params.dpi;
        let cliente = await Cliente.findByPk(clienteid);

        if(!cliente){
            res.status(404).json({
                message: "No existe cliente con id = " + clienteid,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json({
                message: "Se ha borrado el cliente con id = " + libroid,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado el cliente con id = " + req.params.dpi,
            error: error.message,
        });
    }
}