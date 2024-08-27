import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { Button, TextInput, Appbar } from 'react-native-paper'

import servidor from '../utils/servidor'

export default function Adicionar({ route, navigation }) {
  const [id, setId] = useState('')
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [preco, setPreco] = useState('')

  async function removerProduto() {
    let resp = await servidor.removerProduto({
      id: id,
      nome: nome,
      quantidade: quantidade,
      preco: preco
    })
    
    if(resp) {
      alert("Produto removido")
      navigation.navigate("Principal")
    } else {
      alert("Erro ao remover produto")
    }
  }

  async function editarProduto() {
    let resp = await servidor.editarProduto({
      id: id,
      nome: nome,
      quantidade: quantidade,
      preco: preco
    })
    
    if(resp){
      alert("Produto editado")
      navigation.navigate("Principal")
    } else {
      alert("Erro ao editar produto")
    }
  }

  // configura os valores a partir dos que foram passados na navegação
  useEffect(() => {
    const produto = route.params
    if (produto) {
      setId(produto.id)
      setNome(produto.nome)
      setPreco(produto.preco)
      setQuantidade(produto.quantidade)
    }
  }, [route.params])

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Detalhes" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.item}
          label="ID"
          value={id}
          readOnly={true}
          onChangeText={setId}
        />

        <TextInput
          style={styles.item}
          label="Nome"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.item}
          label="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TextInput
          style={styles.item}
          label="Preço"
          value={preco}
          onChangeText={setPreco}
        />

        <View style={styles.barraBotao}>
          <Button
            mode="contained"
            style={styles.botao}
            icon="delete"
            onPress={removerProduto}>Remover
          </Button>

          <Button
            mode="contained"
            style={styles.botao}
            icon="file-edit"
            onPress={editarProduto}>Editar
          </Button>
        </View>

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginTop: 20
  },
  item: {
    marginBottom: 5
  },
  botao: {
    margin: 5,
    marginTop: 20,
    flexGrow: 1
  },
  barraBotao: {
    width: '100%',
    flexDirection: 'row'
  }
})