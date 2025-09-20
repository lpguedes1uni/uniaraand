import * as React from "react";
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function TelaInicial({ navigation, itens }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Modelos de Motos</Text>
      {itens.length === 0 ? (
        <Text style={styles.vazio}>Nenhum modelo cadastrado</Text>
      ) : (
        <FlatList
          data={itens}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item}</Text>
            </View>
          )}
        />
      )}

      <Button
        title="Gerenciar Modelos"
        onPress={() => navigation.navigate("Itens")}
      />
    </View>
  );
}

function TelaItens({ itens, setItens, navigation }) {
  const [novoItem, setNovoItem] = React.useState("");
  const [editarIndex, setEditarIndex] = React.useState(null);
  const adicionarOuAtualizar = () => {
    if (novoItem.trim() === "") return;
    if (editarIndex !== null) {
      const itensAtualizados = [...itens];
      itensAtualizados[editarIndex] = novoItem;
      setItens(itensAtualizados);
      setEditarIndex(null);
    } else {
      setItens([...itens, novoItem]);
    }
    setNovoItem("");
  };
  const editarItem = (index) => {
    setNovoItem(itens[index]);
    setEditarIndex(index);
  };
  const removerItem = (index) => {
    const itensAtualizados = itens.filter((_, i) => i !== index);
    setItens(itensAtualizados);
    setNovoItem("");
    setEditarIndex(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Modelos</Text>

      <TextInput
        placeholder="Digite o modelo da moto"
        value={novoItem}
        onChangeText={setNovoItem}
        style={styles.input}
      />
      <Button
        title={editarIndex !== null ? "Atualizar Modelo" : "Adicionar Modelo"}
        onPress={adicionarOuAtualizar}
      />
      <FlatList
        data={itens}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <View style={styles.itemLista}>
            <Text style={{ flex: 1 }}>{item}</Text>
            <TouchableOpacity
              style={styles.botaoEditar}
              onPress={() => editarItem(index)}
            >
              <Text style={styles.textBotao}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerItem(index)}
            >
              <Text style={styles.textBotao}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 28, marginBottom: 12 },
  vazio: { fontStyle: "italic" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12, borderRadius: 4 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#ccc" },
  itemLista: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  botaoEditar: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    marginRight: 5,
  },
  botaoRemover: {
    backgroundColor: "#f44336",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  textBotao: { color: "#fff", fontWeight: "bold" },
});

export default function App() {
  const [itens, setItens] = React.useState([
    "Honda CB 300F",
    "Yamaha MT07",
    "Kawasaki Ninja",
  ]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen name="Inicial">
          {(props) => <TelaInicial {...props} itens={itens} />}
        </Stack.Screen>
        <Stack.Screen name="Itens">
          {(props) => <TelaItens {...props} itens={itens} setItens={setItens} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
