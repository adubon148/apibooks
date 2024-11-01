const db = require('../config/db.config.js');
const Libro = db.book;

exports.create = (req, res) => {
    let libro = {};

    try{
        
        libro.Titulo = req.body.Titulo;
        libro.AñoPublicacion = req.body.AñoPublicacion;
        libro.descrpcion = req.body.descrpcion;
        libro.autorId = req.body.autorId;
        llibro.tipoid = req.body.tipoid;
        
        
        Libro.create(libro).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente el libro con ID: " + result.id,
                libro: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllbooks = (req, res) => {
    
    Libro.findAll()
        .then(bookInfos => {
            res.status(200).json({
                message: "se han obtenido todos los libros con exito!",
                libros: bookInfos
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

exports.getBookById = (req, res) => {
 
  let id = req.params.id;
  Libro.findByPk(id)
      .then(libro => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente el libro con ID: = " + id,
              libros: libro
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
        let libroid = req.params.id;
        let libro = await Libro.findByPk(libroid);
    
        if(!libro){
            // return a response to client
            res.status(404).json({
                message: "No se ha encontrado el libro con ID = " + libroid,
                libro: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
              Username: req.body.Username,
              password: req.body.password,
              nombre: req.body.nombre,
              autorId:req.body.autorId,
              tipoid:req.body.tipoid
            }
            let result = await Libro.update(updatedObject, {returning: true, where: {id: libroid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar libro con id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "actualizacion exitosa de libro con id = " + userid,
                libro: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> no se puede editar libro con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let libroid = req.params.id;
        let libro = await Libro.findByPk(libroid);

        if(!libro){
            res.status(404).json({
                message: "No existe libro con id = " + libroid,
                error: "404",
            });
        } else {
            await libro.destroy();
            res.status(200).json({
                message: "Se ha borrado el libro con id = " + libroid,
                libro: libro,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado el libro con id = " + req.params.id,
            error: error.message,
        });
    }
}