module.exports = mongoose => {
    
    // especifica a collection desse objeto
    const Livro = mongoose.model(
    "livros",
    mongoose.Schema(
    {
    nome: String,
    ano: String,
    autor: String,
    editora: String,
    tipo: String,
    obs: String,
    quantidade: Number
    },
    { timestamps: true }
    )
    );
    return Livro;
    };