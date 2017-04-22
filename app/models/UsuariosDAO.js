let crypto = require('crypto');

function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {   
    this._connection.open(function(err, db) {
        db.collection('usuarios', function(err, collection) {
            let user = usuario;    
            user.senha = crypto.createHash('md5').update(usuario.senha).digest('hex');

            collection.insert(user);
            db.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, success, error) {
    this._connection.open(function(err, db) {
        db.collection('usuarios', function(err, collection) {
            let user = usuario;
            user.senha = crypto.createHash('md5').update(usuario.senha).digest('hex');

            collection.find(user).toArray(function(err, result){
                if(result[0] !== undefined) {
                    req.session.autorizado = true;
                    req.session.usuario = result[0].usuario;
                    req.session.casa = result[0].casa;
                }

                db.close();

                if(req.session.autorizado) {
                    success();
                } else {
                    error();
                }
            });
        });
    });
}

module.exports = () => UsuariosDAO;