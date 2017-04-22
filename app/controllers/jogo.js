module.exports.jogo = function(application, req, res) {
    if(!req.session.autorizado) {
        res.redirect('/');
        return;
    }



    let JogoDAO = new application.app.models.JogoDAO(application.config.dbConnection);
    JogoDAO.iniciaJogo(req.session.usuario, function(jogo) {
        res.render('jogo', {
            img_casa: req.session.casa,
            jogo: jogo,
            msg: req.query.msg || ''
        });
    });
}

module.exports.sair = function(application, req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}

module.exports.suditos = function(application, req, res) {
    if(!req.session.autorizado) {
        res.redirect('/');
        return;
    }

    res.render('aldeoes');
}

module.exports.pergaminhos = function(application, req, res) {
    if(!req.session.autorizado) {
        res.redirect('/');
        return;
    }

    let JogoDAO = new application.app.models.JogoDAO(application.config.dbConnection);
    JogoDAO.getAcoes(req.session.usuario, function(acoes) {
        res.render('pergaminhos', {acoes});
    });
}

module.exports.ordenarAcaoSudito = function(application, req, res) {
    if(!req.session.autorizado) {
        res.redirect('/');
        return;
    }
    
    req.assert('acao', 'Campo "Ação" é obrigatorio').notEmpty();
    req.assert('quantidade', 'Campo "Quantidade" é obrigatorio').notEmpty();

    let erros = req.validationErrors();

    if(erros) {
        res.redirect('/jogo?msg=ERRO');
        return;
    }

    let JogoDAO = new application.app.models.JogoDAO(application.config.dbConnection);
    let acao = req.body;
    acao.usuario = req.session.usuario;
    JogoDAO.acao(acao, function() {
        res.redirect('/jogo?msg=OK');
    });
}

module.exports.revogarAcao = function(application, req, res) {
    if(!req.session.autorizado) {
        res.redirect('/');
        return;
    }
    let JogoDAO = new application.app.models.JogoDAO(application.config.dbConnection);
    JogoDAO.revogarAcao(req.query.id, function() {
        res.redirect('/jogo?msg=TASK_REMOVED');
    });
}