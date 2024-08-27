import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native'
import { DataTable, FAB, Appbar } from 'react-native-paper'
import { useState, useEffect } from 'react'

export default function Principal({ navigation }) {
  const [produtos, setProdutos] = useState([])

  function verDetalhes(produto) {
    navigation.navigate('Detalhes', produto)
  }

  async function lerProdutos() {
    try {
      const response = await fetch('http://127.0.0.1:5000/produto')
      return await response.json()
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      lerProdutos().then((resp) => setProdutos(resp))
    });

    return unsubscribe;
  }, [navigation])

  return (
    <>
      <Appbar>
        <Appbar.Content title="Produtos" />
      </Appbar>

      <SafeAreaView style={styles.container}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Produto</DataTable.Title>
            <DataTable.Title numeric>Quantidade</DataTable.Title>
            <DataTable.Title numeric>Preço</DataTable.Title>
          </DataTable.Header>
        </DataTable>

        {produtos.map((produto) => (
          <DataTable.Row
            key={produto.p_id}
            onPress={() => verDetalhes(produto)}  
          >
            <DataTable.Cell>{produto.nome}</DataTable.Cell>
            <DataTable.Cell numeric>{produto.quantidade}</DataTable.Cell>
            <DataTable.Cell numeric>{produto.preco}</DataTable.Cell>
          </DataTable.Row>
        ))}
        <StatusBar mode="auto" />

      </SafeAreaView>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('Adicionar')}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});
