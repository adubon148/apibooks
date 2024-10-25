const db = require('../config/db.config.js');
const TipoLibro = db.tipolibro;

exports.create = (req, res) => {
    let tlibro = {};

    try{
        
        tlibro.tipo = req.body.tipo;
        tlibro.descripcion = req.body.descripcion;
        tlibro.preciorenta = req.body.preciorenta;
        
        
        TipoLibro.create(tlibro).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente la categoria de libro con ID: " + result.id,
                TipoLibro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAlltipos = (req, res) => {
    
    TipoLibro.findAll()
        .then(tipoInfos => {
            res.status(200).json({
                message: "se han obtenido todos las categorias de libros con exito!",
                tipos: tipoInfos
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

exports.gettipoLibroById = (req, res) => {
 
  let id = req.params.id;
  TipoLibro.findByPk(id)
      .then(tipolobro => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente la categoria con ID: = " + id,
              Categoria: tipolobro
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
        let tipoid = req.params.id;
        let tipo = await TipoLibro.findByPk(tipoid);
    
        if(!tipo){
            // return a response to client
            res.status(404).json({
                message: "No se ha encontrado la categoria de libro con ID = " + tipoid,
                Cateogoria: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                tipo: req.body.tipo,
                descripcion: req.body.descripcion,
                preciorenta: req.body.preciorenta,
                
            }
            let result = await TipoLibro.update(updatedObject, {returning: true, where: {id: tipoid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar la categrua de libro con id = " + req.params.id,
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
            message: "Error -> no se puede editar la categoria de libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let tipoid = req.params.id;
        let tipo = await TipoLibro.findByPk(tipoid);

        if(!tipo){
            res.status(404).json({
                message: "No existe categoria con id = " + tipoid,
                error: "404",
            });
        } else {
            await tipo.destroy();
            res.status(200).json({
                message: "Se ha borrado la categoria con id = " + tipoid,
                tipo: tipo,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado la categoria de libro con id = " + req.params.id,
            error: error.message,
        });
    }
}