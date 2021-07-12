module.exports = app => {
    const emprestimo = require("../controllers/emprestimo.controller.js");

    var router = require("express").Router();

    // Insere novo Livro
    router.post("/", emprestimo.create);

    // // Retorna todos os Livros
    router.get("/", emprestimo.findAll);

    router.get("/:id", emprestimo.findOne);

    // Atualiza o Livro dado seu ID
    router.put("/:id", emprestimo.update);

    // // Remove um Livro dado seu id
    router.delete("/:id", emprestimo.delete);

    app.use('/api/emprestimos', router);
};