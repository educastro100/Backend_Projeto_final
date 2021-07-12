module.exports = app => {
    const pedido = require("../controllers/pedido.controller.js");

    var router = require("express").Router();

    // Insere novo Livro
    router.post("/", pedido.create);

    // Retorna todos os Livros
    router.get("/", pedido.findAll);

    router.get("/:id", pedido.findOne);

    // Atualiza o Livro dado seu ID
    router.put("/:id", pedido.update);

    // // Remove um Livro dado seu id
    router.delete("/:id", pedido.delete);

    app.use('/api/pedidos', router);
};