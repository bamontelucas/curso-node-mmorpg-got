module.exports.index = function(application, req, res) {
    res.render('index', {validacao: [], usuario: ''});
}

module.exports.autenticar = function(application, req, res) {
    
    req.assert('usuario', 'Campo usuário é obrigatório').notEmpty()
    req.assert('senha', 'Campo senha é obrigatório').notEmpty()
    
    let erros = req.validationErrors();
    if(erros) {
        res.render('index', {validacao: erros, usuario: req.body.usuario});
        return;
    }

    let UsuariosDAO = new application.app.models.UsuariosDAO(application.config.dbConnection);
    UsuariosDAO.autenticar(req.body, req, function() {
        res.redirect('jogo');
    }, function() {
        res.render('index', {validacao: [{msg: 'Usuário ou senha incorretos'}], usuario: req.body.usuario});
    });
}