module.exports.cadastro = function(application, req, res) {
    res.render('cadastro', {validacao: [], dadosForm: {}});
};

module.exports.cadastrar = function(application, req, res) {
    
    req.assert('nome', 'Nome é obrigatório').notEmpty();
    req.assert('usuario', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatória').notEmpty();
    req.assert('casa', 'Casa é obrigatória').notEmpty();

    let erros = req.validationErrors()
    if(erros) {
        res.render('cadastro', {validacao: erros, dadosForm: req.body});
        return;
    }

    let UsuariosDAO = new application.app.models.UsuariosDAO(application.config.dbConnection);
    UsuariosDAO.inserirUsuario(req.body);

    let JogoDAO = new application.app.models.JogoDAO(application.config.dbConnection);
    JogoDAO.gerarParametros(req.body.usuario);
    
    res.render('cadastro_sucesso');
}