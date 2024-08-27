import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { Provider, DefaultTheme } from 'react-native-paper'

import Principal from './telas/Principal'
import Adicionar from './telas/Adicionar'

const Stack = createStackNavigator()

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors
  }
}

export default function App() {
  return (
    <Provider theme={tema}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Principal" component={Principal} />
          <Stack.Screen name="Adicionar" component={Adicionar} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}