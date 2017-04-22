function JogoDAO(connection) {
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario) {
    this._connection.open(function(err, db) {
        db.collection('jogo', function(err, collection) {
            collection.insert({
                usuario: usuario,
                moeda: 15,
                suditos: 10,
                temor: Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            });
            db.close();
        });
    });
}

JogoDAO.prototype.iniciaJogo = function(usuario, callback) {
    this._connection.open(function(err, db) {
        db.collection('jogo', function(err, collection) {
            collection.find({usuario}).toArray(function(err, result){
                if(callback) {
                    callback(result[0]);
                }
            });
        });
    });
}

JogoDAO.prototype.acao = function(acao, callback) {
    this._connection.open(function(err, db) {
        db.collection('acao', function(err, collection) {
            acao.end_time = (new Date()).getTime();
            switch(acao.acao) {
                case "1":
                    acao.end_time+= 3600 * 1000 * 1;
                    break;
                case "2":
                    acao.end_time+= 3600 * 1000 * 2;
                    break;
                case "3":
                    acao.end_time+= 3600 * 1000 * 5;
                    break;
                case "4":
                    acao.end_time+= 3600 * 1000 * 5;
                    break;
            }
            collection.insert(acao);
            db.close();
            callback();
        });
    });
}

JogoDAO.prototype.getAcoes = function(usuario, callback) {
    this._connection.open(function(err, db) {
        db.collection('acao', function(err, collection) {
            let end_time = {
                $gt: (new Date()).getTime()
            };
            collection.find({usuario,  end_time}).toArray(function(err, result){
                if(callback) {
                    callback(result);
                }
            });
        });
    });
}

module.exports = () => JogoDAO;