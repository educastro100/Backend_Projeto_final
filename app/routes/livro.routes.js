module.exports = app => {
    const livro = require("../controllers/livro.controller.js");

    var router = require("express").Router();

    // Insere novo Livro
    router.post("/", livro.create);

    // Retorna todos os Livros
    router.get("/", livro.findAll);

    router.get("/:id", livro.findOne);

    // Atualiza o Livro dado seu ID
    router.put("/:id", livro.update);

    // // Remove um Livro dado seu id
    router.delete("/:id", livro.delete);


    app.use('/api/livros', router);
};