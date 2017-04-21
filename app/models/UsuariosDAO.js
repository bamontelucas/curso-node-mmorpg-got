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

module.exports = () => UsuariosDAO;