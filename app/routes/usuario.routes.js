module.exports = app => {
    const usuario = require("../controllers/usuario.controller.js");

        var router = require("express").Router();

    // Insere novo Livro
    router.post("/", usuario.create);

    // // Retorna todos os Livros
    router.get("/", usuario.findAll);

    router.get("/:id", usuario.findOne);

    // Atualiza o Livro dado seu ID
    router.put("/:id", usuario.update);

    // // Remove um Livro dado seu id
    router.delete("/:id", usuario.delete);


    app.use('/api/usuarios', router);
};