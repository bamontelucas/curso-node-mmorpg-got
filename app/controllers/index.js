module.exports.index = function(application, req, res) {
    res.render('index', {validacao: []});
}
module.exports.autenticar = function(application, req, res) {
    
    req.assert('usuario', 'Campo usuário é obrigatório').notEmpty()
    req.assert('senha', 'Campo senha é obrigatório').notEmpty()
    
    let erros = req.validationErrors();
    if(erros) {
        res.render('index', {validacao: erros});
        return;
    }

    let UsuariosDAO = new application.app.models.UsuariosDAO(application.config.dbCOnnection);
    UsuariosDAO.autenticar(req.body, req, res);
}