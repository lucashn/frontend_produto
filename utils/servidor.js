/**
 * Lida com toda a comunicação com o servidor (API REST)
 * Versão falsa para testes
 */
async function lerProdutos() {
  return [
    {
      id: 1,
      nome: 'Calça',
      quantidade: 10,
      preco: 20
    },
    {
      id: 2,
      nome: 'Camiseta',
      quantidade: 20,
      preco: 30
    },
    {
      id: 3,
      nome: 'Meia',
      quantidade: 12,
      preco: 9.99
    }
  ]
}

async function adicionarProduto(produto) {
  return true
}

async function editarProduto(produto) {
  return true
}

async function removerProduto(produto) {
  return true
}

module.exports = {
  lerProdutos,
  adicionarProduto,
  editarProduto,
  removerProduto
}