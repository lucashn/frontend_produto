import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

export default function Adicionar({ route, navigation }) {
  const [PID, setPID] = useState('')
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [preco, setPreco] = useState('')

  async function editarProduto() {
    try {
      const response = await fetch('http://127.0.0.1:5000/produto/' + PID, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          quantidade: quantidade,
          preco: preco
        })
      })

      if (response.status == 201) {
        alert("Produto editado")
        navigation.navigate('Principal')
      } else {
        throw "Valores inválidos"
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  async function removerProduto() {
    try {
      const response = await fetch('http://127.0.0.1:5000/produto/' + PID, {
        method: 'DELETE'
      })

      if (response.status == 204) {
        alert("Produto removido")
        navigation.navigate('Principal')
      } else {
        throw "Valores inválidos"
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  // configura os valores a partir dos que foram passados
  useEffect(() => {
    const produto = route.params
    if (produto) {
      setPID(produto.p_id)
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
          value={PID}
          editable={false}
          onChangeText={setPID}
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