const db = require("../models");
const Emprestimo = db.emprestimo;

exports.create = (req, res) => {

    // TO DO: Adicionar verificação se o usuário pode solicitar empréstimo
    // ...

    // Verifica se existem as informações necessárias para adicionar um livro
    if (!req.body.id_usuario || !req.body.nomeUsuario || !req.body.status || !req.body.dataIni || !req.body.dataFim) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes" });
        // Encerra a função.
        return;

    // Tem os campos necessários
    } else{
        const emprestimo = new Emprestimo({
            id_usuario: req.body.id_usuario,
            status: req.body.status,
            dataIni: req.body.dataIni,
            dataFim: req.body.dataFim,
            nomeUsuario: req.body.nomeUsuario
        });


        emprestimo.save(emprestimo).then(data => {
            //TO DO: Setar flag de emprestimo ativado como True
            // ...

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
    Emprestimo.find(condition).then(data => {

        //To Do: Verificar se a data já passou. Se sim, atualiza os registros para "Atrasado"
        // ...

        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de Emprestimos" })
    });

};


exports.findOne = (req, res) => {

    console.log(req.params.id);
    /* Condição vazia = seleciona todos itens */
    var condition = {'_id' : req.params.id};
    Emprestimo.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter emprestimo" })
    });

};

exports.update = (req, res) => {

    console.log("chegou aqui");

    if(!req.body){
        res.status(400).send({msg: "Dados inválidos"});
        return;
    }

    const id = req.params.id;

    Emprestimo.findByIdAndUpdate(id, req.body).then(data => {
        if(!data){
            res.status(400).send({msg: "Não foi possível atualizar o empréstimo"});
        }else{
            res.send({msg: "Empréstimo atualizado com sucesso!"});
        }

    }).catch(err => {
        res.status(500).send({msg: "Erro ao atualizar o Empréstimo"})    })

}

exports.delete = (req, res) => {
    
    const id = req.params.id;

    Emprestimo.findByIdAndRemove(id).then(data => {
        if(!data){
            res.status(400).send({msg: "Não foi possível remover o Empréstimo!"});
        }else{
            res.send({msg: "Empréstimo deletado com sucesso!"});
        }
    }).catch(err => {
        res.status(500).send({msg: "Erro ao tentar deletar Empréstimo!"});
    })

}