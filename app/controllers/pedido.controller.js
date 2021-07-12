const db = require("../models");
const Pedido = db.pedido;

exports.create = (req, res) => {


    if (!req.body.id_emprestimo ||  !req.body.id_livro ) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;

    // Tem os campos necessários
    } else{
        const pedido = new Pedido({
            id_emprestimo: req.body.id_emprestimo,
            id_livro: req.body.id_livro
            
        });


        pedido.save(pedido).then(data => {
            
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

    /* Condição vazia = seleciona todos itens */
    var condition = {};
    Pedido.find(condition).then(data => {

    
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de Pedidos" })
    });

};

exports.update = (req, res) => {

    if(!req.body){
        res.status(400).send({msg: "Dados inválidos"});
        return;
    }

    const id = req.params.id;

    Pedido.findByIdAndUpdate(id, req.body).then(data => {
        if(!data){
            res.status(400).send({msg: "Não foi possível atualizar o pedido"});
        }else{
            res.send({msg: "pedido atualizado com sucesso!"});
        }

    }).catch(err => {
        res.status(500).send({msg: "Erro ao atualizar o pedido"})    })

}

exports.delete = (req, res) => {
    
    const id = req.params.id;

    Pedido.findByIdAndRemove(id).then(data => {
        if(!data){
            res.status(400).send({msg: "Não foi possível remover o Pedido!"});
        }else{
            res.send({msg: "Pedido deletado com sucesso!"});
        }
    }).catch(err => {
        res.status(500).send({msg: "Erro ao tentar deletar Pedido!"});
    })

}


exports.findOne = (req, res) => {

    console.log(req.params.id);
    /* Condição vazia = seleciona todos itens */
    var condition = {'id_emprestimo' : req.params.id};
    Pedido.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter Pedido" })
    });

};