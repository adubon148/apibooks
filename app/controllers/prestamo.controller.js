const db = require('../config/db.config.js');
const Prstm = db.Prestamo;

exports.create = (req, res) => {
    let prstm = {};

    try{
        
        prstm.fechaprestamo = req.body.fechaprestamo;
        prstm.idestado = req.body.idestado;
        prstm.idlibro = req.body.idlibro;
        prstm.idcliente = req.body.idcliente;
        prstm.userid = req.body.userid;
        
        
        Prstm.create(prstm).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente el usuario con ID: " + result.id,
                prestamo: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllUsers = (req, res) => {
    
    Prstm.findAll()
        .then(userPrestms => {
            res.status(200).json({
                message: "se han obtenido todos los usuarios con exito!",
                prestamos: userPrestms
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

exports.getById = (req, res) => {
 
  let id = req.params.id;
  Prstm.findByPk(id)
      .then(prestamo => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente el prestamo con ID: = " + id,
              prestamos: prestamo
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
        let prstmid = req.params.id;
        let prestamo = await Prstm.findByPk(prstmid);
    
        if(!prestamo){
            // return a response to client
            res.status(404).json({
                message: "No se ha encontrado el usuario con ID = " + prstmid,
                prestamo: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
        
                fechaprestamo: req.body.fechaprestamo,
                idestado: req.body.idestado,
                idlibro: req.body.idlibro,
                idcliente: req.body.idcliente,
                userid: req.body.userid,
            }
            let result = await Prstm.update(updatedObject, {returning: true, where: {id: prstmid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar usuario con id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "actualizacion exitosa de usuario con id = " + prstmid,
                prestamo: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> no se puede editar usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let pretmid = req.params.id;
        let prestamo = await Prstm.findByPk(pretmid);

        if(!prestamo){
            res.status(404).json({
                message: "No existe usuario con id = " + pretmid,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Se ha borrado el usuario con id = " + pretmid,
                prestamo: prestamo,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}