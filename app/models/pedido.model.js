module.exports = mongoose => {
    
    // especifica a collection desse objeto
    const Pedido = mongoose.model(
    "pedidos",
    mongoose.Schema(
    {
    id_emprestimo: String,
    id_livro: String
    },
    { timestamps: true }
    )
    );
    return Pedido;
    };