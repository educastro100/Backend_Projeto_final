module.exports = mongoose => {
    
    // especifica a collection desse objeto
    const Usuario = mongoose.model(
    "usuarios",
    mongoose.Schema(
    {
    nome: String,
    cpf: String,
    email: String,
    idade: String,
    empAtivo: Boolean,
    senha: String
    },
    { timestamps: true }
    )
    );
    return Usuario;
    };