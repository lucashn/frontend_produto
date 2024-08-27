import { useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, TextInput, Appbar } from 'react-native-paper';

import servidor from '../utils/servidor'

export default function Adicionar({ navigation }) {
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [preco, setPreco] = useState('')

  async function adicionarProduto() {
    let resp = await servidor.adicionarProduto({
      nome: nome,
      quantidade: quantidade,
      preco: preco
    })
    if(resp) {
      alert("Produto adicionado com sucesso")
      setNome("")
      setQuantidade("")
      setPreco("")
    } else {
      alert("Erro ao tentar adicionar o produto")
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