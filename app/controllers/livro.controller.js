const db = require("../models");
const Livro = db.livro;


// Adicionar um novo livro
exports.create = (req, res) => {
    
    // Verifica se existem as informações necessárias para adicionar um livro
    if (!req.body.nome || !req.body.ano || !req.body.autor || !req.body.editora || !req.body.tipo || !req.body.obs || !req.body.quantidade) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;

    // Tem os campos necessários
    } else{
        const livro = new Livro({
            nome: req.body.nome,
            ano: req.body.ano,
            autor: req.body.autor,
            editora: req.body.editora,
            tipo: req.body.tipo,
            obs: req.body.obs,
            quantidade: req.body.quantidade 
        });


        livro.save(livro).then(data => {

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


// Retornar a lista de livros
exports.findAll = (req, res) => {

    /* Condição vazia = seleciona todos itens */
    var condition = {};
    Livro.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de livros" })
    });

};


// Retornar a lista de livros
exports.findOne = (req, res) => {

    console.log(req.params.id);
    /* Condição vazia = seleciona todos itens */
    var condition = {'_id' : req.params.id};
    Livro.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter livro" })
    });

};


// Atualiza um Livro especifico
exports.update = (req, res) => {

    if(!req.body){
        res.status(400).send({msg: "Dados inválidos"});
        return;
    }

    const id = req.params.id;

    Livro.findByIdAndUpdate(id, req.body).then(data => {
        if(!data){
            res.status(400).send({msg: "Não foi possível atualizar o Livro"});
        }else{
            res.send({msg: "Livro atualizado com sucesso!"});
        }

    }).catch(err => {
        res.status(500).send({msg: "Erro ao atualizar o Livro"})
    })

}

// Deleta um livro específico.
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Livro.findByIdAndRemove(id).then(data => {
        if(!data){
            res.status(400).send({msg: "Não foi possível remover o livro!"});
        }else{
            res.send({msg: "Livro deletado com sucesso!"});
        }
    }).catch(err => {
        res.status(500).send({msg: "Erro ao tentar deletar livro!"});
    })

}