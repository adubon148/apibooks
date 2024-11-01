const db = require('../config/db.config.js');
const User = db.user;

exports.create = (req, res) => {
    let user = {};

    try{
        
        user.Username = req.body.Username;
        user.password = req.body.password;
        user.nombre = req.body.nombre;
        
        
        User.create(user).then(result => {    
            
            res.status(200).json({
                message: "Se ha creado satisfactoriamente el usuario con ID: " + result.Username,
                user: result,
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
    
    User.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "se han obtenido todos los usuarios con exito!",
                usuarios: userInfos
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

exports.getUserById = (req, res) => {
 
  let id = req.params.Username;
  User.findByPk(id)
      .then(user => {
          res.status(200).json({
              message: " Se ha encontrado satisfactoriamente el usuario con ID: = " + id,
              usuarios: user
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
        let userid = req.params.Username;
        let user = await User.findByPk(userid);
    
        if(!user){
            // return a response to client
            res.status(404).json({
                message: "No se ha encontrado el usuario con ID = " + userid,
                user: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
              
              password: req.body.password,
              nombre: req.body.nombre
            }
            let result = await User.update(updatedObject, {returning: true, where: {Username: userid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> no se puede editar usuario con id = " + req.params.Username,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "actualizacion exitosa de usuario con id = " + userid,
                user: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> no se puede editar usuario con id = " + req.params.Username,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let userid = req.params.Username;
        let user = await User.findByPk(userid);

        if(!user){
            res.status(404).json({
                message: "No existe usuario con id = " + userid,
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Se ha borrado el usuario con id = " + userid,
                User: user,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> NO Se ha borrado el usuario con id = " + req.params.Username,
            error: error.message,
        });
    }
}