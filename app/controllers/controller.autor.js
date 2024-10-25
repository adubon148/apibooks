const db = require('../config/db.config.js');
const Autor = db.autor;

exports.create = (req, res) => {
    let autor = {};

    try{
        
        autor.Nombre = req.body.Nombre;
        autor.Nacionalidad = req.body.Nacionalidad;
        autor.FechaNac = req.body.FechaNac;
        
        
        Autor.create(autor).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente el autor con ID: " + result.id,
                autor: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllautores = (req, res) => {
    
    Autor.findAll()
        .then(userautores => {
            res.status(200).json({
                message: "se han obtenido todos los autores con exito!",
                autores: userautores
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

exports.getAutorById = (req, res) => {
 
  let id = req.params.id;
  Autor.findByPk(id)
      .then(autor => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente el autor con ID: = " + id,
              autor: autor
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
        let autorid = req.params.id;
        let autor = await Autor.findByPk(autorid);
    
        if(!autor){
            // return a response to client
            res.status(404).json({
                message: "No se ha encontrado el autor con ID = " + autorid,
                Autor: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                Nombre: req.body.Nombre,
                Nacionalidad: req.body.Nacionalidad,
                FechaNac: req.body.FechaNac
            }
            let result = await Autor.update(updatedObject, {returning: true, where: {id: autorid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar autor con id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "actualizacion exitosa de autor con id = " + autorid,
                autor: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> no se puede editar autor con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let autorid = req.params.id;
        let autor = await Autor.findByPk(autorid);

        if(!autor){
            res.status(404).json({
                message: "No existe autor con id = " + autorid,
                error: "404",
            });
        } else {
            await autor.destroy();
            res.status(200).json({
                message: "Se ha borrado el autor con id = " + autorid,
                User: user,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado el autor con id = " + req.params.id,
            error: error.message,
        });
    }
}