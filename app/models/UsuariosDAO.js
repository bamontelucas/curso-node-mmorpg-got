function UsuariosDAO(connection) {
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario) {
    this._connection.open(function(err, db) {
        db.collection('usuarios', function(err, collection) {
            collection.insert(usuario);
            db.close();
        });
    });
}

UsuariosDAO.prototype.autenticar = function(usuario, req, success, error) {
    this._connection.open(function(err, db) {
        db.collection('usuarios', function(err, collection) {
            collection.find(usuario).toArray(function(err, result){
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