module.exports = mongoose => {
    
    // especifica a collection desse objeto
    const Emprestimo = mongoose.model(
    "emprestimos",
    mongoose.Schema(
    {
    id_usuario: String,
    nomeUsuario: String,
    status: String,
    dataIni: String,
    dataFim: String
    },
    { timestamps: true }
    )
    );
    return Emprestimo;
    };