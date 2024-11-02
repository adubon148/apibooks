const db = require('../config/db.config.js');
const Estado = db.estado;

exports.create = (req, res) => {
    let estado = {};

    try{
        
        estado.estado = req.body.estado;
        estado.descripcion = req.body.descripcion;        
        
        Estado.create(estado).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente la categoria de libro con ID: " + result.id,
                estado: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllestados = (req, res) => {
    
    Estado.findAll()
        .then(estadoInfos => {
            res.status(200).json({
                message: "se han obtenido todos los estados de prestamo con exito!",
                estados: estadoInfos
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
  Estado.findByPk(id)
      .then(estado => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente la categoria con ID: = " + id,
              estado: estado
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
        let estadoid = req.params.id;
        let estado = await Estado.findByPk(estadoid);
    
        if(!estado){
           
            res.status(404).json({
                message: "No se ha encontrado la categoria con ID = " + estadoid,
                estado: "",
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                estado: req.body.estado,
                descripcion: req.body.descripcion
                
            }
            let result = await Estado.update(updatedObject, {returning: true, where: {id: estadoid}});
            
            
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar la categrua  con id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "actualizacion exitosa con id = " + estadoid,
                estado: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> no se puede editar la categoria de libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let estadoid = req.params.id;
        let estado = await Estado.findByPk(estadoid);

        if(!estado){
            res.status(404).json({
                message: "No existe categoria con id = " + estadoid,
                error: "404",
            });
        } else {
            await estado.destroy();
            res.status(200).json({
                message: "Se ha borrado la categoria con id = " + estadoid,
                estado: estado,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado la categoriacon id = " + req.params.id,
            error: error.message,
        });
    }
}