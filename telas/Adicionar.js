import { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

export default function Adicionar({ navigation }) {
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [preco, setPreco] = useState('')

  async function adicionarProduto() {
    try {
      const response = await fetch('http://127.0.0.1:5000/produto', {
        method: 'POST',
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

      if(response.status == 201) {
        alert("Produto adicionado")
        setNome("")
        setPreco("")
        setQuantidade("")
      } else {
        throw "Valores inválidos"
      }
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <>
      <Appbar>
        <Appbar.BackAction onPress={() => { navigation.goBack() }} />
        <Appbar.Content title="Adicionar produto" />
      </Appbar>

      <SafeAreaView style={styles.container}>
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

        <Button
          mode="contained"
          style={styles.botao}
          icon="plus"
          onPress={adicionarProduto}>Adicionar
        </Button>

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
    marginTop: 20
  }
})