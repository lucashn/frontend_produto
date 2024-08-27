/**
 * Lida com toda a comunicação com o servidor (API REST)
 */
async function lerProdutos() {
  try {
    const response = await fetch('http://127.0.0.1:5000/produto')
    return await response.json()
  } catch (error) {
    console.log(error)
    return false
  }
}

async function adicionarProduto(produto) {
  try {
    const response = await fetch('http://127.0.0.1:5000/produto', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: produto.nome,
        quantidade: produto.quantidade,
        preco: produto.preco
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function editarProduto(produto) {
  try {
    const response = await fetch('http://127.0.0.1:5000/produto/' + produto.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: produto.nome,
        quantidade: produto.quantidade,
        preco: produto.preco
      })
    })

    return response.status == 201
  } catch (error) {
    console.log(error)
    return false
  }
}

async function removerProduto(produto) {
  try {
    const response = await fetch('http://127.0.0.1:5000/produto/' + produto.id, {
      method: 'DELETE'
    })

    return response.status == 204
  } catch (error) {
    console.log(error)
    return false
  }
}

module.exports = {
  lerProdutos,
  adicionarProduto,
  editarProduto,
  removerProduto
}