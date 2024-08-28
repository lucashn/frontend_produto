import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native'
import { DataTable, FAB, Appbar } from 'react-native-paper'
import { useState, useEffect } from 'react'

import servidor from '../utils/servidor'

export default function Principal({ navigation }) {
  const [produtos, setProdutos] = useState([])

  function verDetalhes(produto) {
    navigation.navigate('Detalhes', produto)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let produtos = await servidor.lerProdutos()

      if (produtos) {
        setProdutos(produtos)
      } else {
        console.log(erro)
        alert("Erro ao tentar ler os produtos")
      }
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

          {produtos.map((produto) => (
            <DataTable.Row
              key={produto.id}
              onPress={() => verDetalhes(produto)}
            >
              <DataTable.Cell>{produto.nome}</DataTable.Cell>
              <DataTable.Cell numeric>{produto.quantidade}</DataTable.Cell>
              <DataTable.Cell numeric>{produto.preco}</DataTable.Cell>
            </DataTable.Row>
          ))}

        </DataTable>

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
