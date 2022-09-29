import React, {useContext} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginContext, {LoginProvider} from './contexts/LoginContext'

import Alteracao from './screens/livros/Alteracao'
import Listagem from './screens/livros/Listagem'
import Login from './screens/Login'
import Visualizacao from './screens/livros/Visualizacao'

const Stack = createNativeStackNavigator()

export default function App() {
  const {token} = useContext(LoginContext)
  
  return (
    <LoginProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Listagem' component={Listagem} options={{title : 'Livros'}} />
          <Stack.Screen name='Alteracao' component={Alteracao} />
          <Stack.Screen name='Visualizacao' component={Visualizacao} />
        </Stack.Navigator>
      </NavigationContainer>
    </LoginProvider>    
  )
}