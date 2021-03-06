module.exports = function (app) {

    app.post('/parametro-seguranca', function(req,res){
        var obj = req.body;
        var usuario = req.usuario; 
        let util = new app.util.Util();
        var errors = [];

        req.assert("nome").notEmpty().withMessage("Nome é um campo Obrigatório");
        req.assert("valor").notEmpty().withMessage("Valor é um campo Obrigatório");

        errors = req.validationErrors();
        
        if(errors){
            res.status(400).send(errors);
            return; 
        }

        obj.dataCriacao = new Date;
        var errors = [];

        salvar(obj, res).then(function(response) {
            obj.id = response.insertId;
            res.status(201).send(obj);
        }); 
    });

    app.put('/parametro-seguranca', function(req,res){
        var obj = req.body;
        var usuario = req.usuario; 
        let util = new app.util.Util();
        var errors = [];

        req.assert("nome").notEmpty().withMessage("Nome é um campo Obrigatório");
        req.assert("valor").notEmpty().withMessage("Valor é um campo Obrigatório");

        errors = req.validationErrors();
        
        if(errors){
            res.status(400).send(errors);
            return; 
        }

        obj.dataCriacao = new Date;
        var errors = [];

        atualizar(obj, res).then(function(response) {
            obj.id = response.insertId;
            res.status(201).send(obj);
        }); 
    });
   
    app.get('/parametro-seguranca', function (req, res) {
        let usuario = req.usuario;
        let util = new app.util.Util();
        let errors = [];

        lista(res).then(function (resposne) {
            res.status(200).json(resposne);
            return;
        });
    });

    app.get('/parametro-seguranca/urls', function (req, res) {
        let usuario = req.usuario;
        let util = new app.util.Util();
        let errors = [];

        listaStorage(res).then(function (resposne) {
            res.status(200).json(resposne);
            return;
        });
    });

    app.get('/parametro-seguranca/:id', function(req,res){        
        let usuario = req.usuario;
        let id = req.params.id;
        let util = new app.util.Util();
        let errors = [];

        buscarPorId(id, res).then(function(response) {
            res.status(200).json(response);
            return;      
        });
    }); 

    app.get('/parametro-seguranca/chave/:id', function(req,res){        
        let usuario = req.usuario;
        let id = req.params.id;
        let util = new app.util.Util();
        let errors = [];

        buscarValorPorChave(id, res).then(function(response) {
            res.status(200).json(response);
            return;      
        });
    }); 

    app.get('/parametro-seguranca/busca-chave/:id', async function (req, res) {                
        let chave = req.params.id;
        
        const connection = await app.dao.connections.EatendConnection.connection();
        const parametroSegurancaRepository = new app.dao.ParametroSegurancaDAO(connection);
        
        try {
            var valorChave = await parametroSegurancaRepository.buscarValorPorChaveSync("'" + chave + "'");           
            res.status(201).send(valorChave[0]);
        }
        catch (exception) {
            console.log("Erro ao carregar parametro (" + id + "), exception: " + exception);
            res.status(500).send(util.customError(errors, "header", "Ocorreu um erro inesperado", ""));            
        }
        finally {
            await connection.close();
        }
    });


    app.delete('/parametro-seguranca/:id', function(req,res){     
        var util = new app.util.Util();
        let usuario = req.usuario;
        let errors = [];
        let id = req.params.id;
        let parametroSeguranca = {};
        parametroSeguranca.id = id;
        
        deletaPorId(id, res).then(function(response) {
            res.status(200).json(parametroSeguranca);
            return;      
        });
    });

    function lista(res) {
        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);

        var errors = [];

        ParametroSegurancaDAO.lista(function (exception, result) {
            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao acessar os dados", "parametroSeguranca");
                res.status(500).send(errors);
                return;
            } else {
                d.resolve(result);
            }
        });
        return d.promise;
    }

    function listaStorage(res) {
        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);

        var errors = [];

        ParametroSegurancaDAO.listaStorage(function (exception, result) {
            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao acessar os dados", "parametroSeguranca");
                res.status(500).send(errors);
                return;
            } else {
                d.resolve(result);
            }
        });
        return d.promise;
    }    
 
    function buscarPorId(id,  res) {
        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();
       
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);
        var errors =[];
     
        ParametroSegurancaDAO.buscaPorId(id, function(exception, result){
            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao acessar os dados", "parametroSeguranca");
                res.status(500).send(errors);
                return;
            } else {
                
                d.resolve(result[0]);
            }
        });
        return d.promise;  
    }

    function buscarValorPorChave(id,  res) {
        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();
       
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);
        var errors =[];
     
        ParametroSegurancaDAO.buscarValorPorChave(id, function(exception, result){
            if (exception) {
                d.reject(exception);
                console.log(exception);
                errors = util.customError(errors, "data", "Erro ao acessar os dados", "parametroSeguranca");
                res.status(500).send(errors);
                return;
            } else {
                
                d.resolve(result[0]);
            }
        });
        return d.promise;  
    }


    function salvar(parametroSeguranca, res){
        delete parametroSeguranca.id;
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);
        var q = require('q');
        var d = q.defer();

        ParametroSegurancaDAO.salva(parametroSeguranca, function(exception, result){
            if(exception){
                console.log('Erro ao inserir Parâmetro de segurança', exception);
                res.status(500).send(exception);   
                d.reject(exception);
                return;
            }
            else{   
                d.resolve(result);
            }
        });
        return d.promise; 
    }

    function atualizar(parametroSeguranca, res){
        let id = parametroSeguranca.id;
        delete parametroSeguranca.id;
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);
        var q = require('q');
        var d = q.defer();

        ParametroSegurancaDAO.atualiza(parametroSeguranca, id, function(exception, result){
            if(exception){
                console.log('Erro ao alterar o Parâmetro de segurança', exception);
                res.status(500).send(exception);   
                d.reject(exception);
                return;
            }
            else{   
                d.resolve(result);
            }
        });
        return d.promise; 
    }

    function deletaPorId(id, res) {
        var q = require('q');
        var d = q.defer();
        var util = new app.util.Util();
        var connection = app.dao.ConnectionFactory();
        var ParametroSegurancaDAO = new app.dao.ParametroSegurancaDAO(connection);
        var errors = [];

        ParametroSegurancaDAO.deletaPorId(id, function (exception, result) {
            if (exception) {
                d.reject(exception);
                errors = util.customError(errors, "data", "Erro ao remover os dados", "parametroSeguranca");
                res.status(500).send(errors);
                return;
            } else {

                d.resolve(result[0]);
            }
        });
        return d.promise;

    }
}

