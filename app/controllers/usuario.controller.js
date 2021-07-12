const db = require("../models");
const Usuario = db.usuario;
const bcrypt = require('bcrypt');





exports.create = (req, res) => {


    

    // Verifica se existem as informações necessárias para adicionar um usuario
    if (!req.body.nome || !req.body.cpf || !req.body.email || !req.body.idade || !req.body.empAtivo || !req.body.senha) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;

        // Tem os campos necessários
    } else {  

       
        const password = req.body.senha;

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);


        const usuario = new Usuario({
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            idade: req.body.idade,
            empAtivo: req.body.empAtivo,
            senha : hash
        });


        usuario.save(usuario).then(data => {

            // Retorna o registro caso tenha sido armazenado com sucesso
            res.send(data);
        }).catch(err => {

            // Caso haja algum problema, identifica o erro 500
            res.status(500).send({
                msg: err.message
            });
        })

    }



};


exports.findAll = (req, res) => {


    var condition = {};
    Usuario.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de usuários" });
    });
};


// Retornar a lista de livros
exports.findOne = (req, res) => {

    console.log(req.params.id);
    /* Condição vazia = seleciona todos itens */
    var condition = {'_id' : req.params.id};
    Usuario.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter Usuário" })
    });

};


exports.delete = (req, res) => {

    const id = req.params.id;
    Usuario.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível remover o usuário" });
        } else {
            res.send({ msg: "Usuário deletado com sucesso!" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao tentar deletar usuário!" });
    })

}

exports.update = (req, res) => {

    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    const id = req.params.id;

    Usuario.findByIdAndUpdate(id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar o usuário." });
        } else {
            res.send({ msg: "Usuário atualizado com sucesso!" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o Usuário" });
    })

}