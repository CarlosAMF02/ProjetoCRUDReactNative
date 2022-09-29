import React, {
  useContext,
  useState
} from 'react'
import {
  Button,
  Text,
  TextInput,
  View
} from 'react-native'

import { Buffer } from 'buffer'

import {login} from '../services/LivrosService'

import LoginContext from '../contexts/LoginContext'

export default function Login(props) {

  const {setAdmin, setToken} = useContext(LoginContext)

  const [usuario, setUsuario] = useState('')
  const [senha, setSenha] = useState('')

  return (
    <View style={{ padding : 16 }}>
      <Text>Digite seu usuário:</Text>
      <TextInput 
        onChangeText={(txt) => setUsuario(txt)}
        style={{ backgroundColor: '#DDD' }} />

      <Text>Digite sua senha:</Text>
      <TextInput 
        onChangeText={(txt) => setSenha(txt)}
        secureTextEntry
        style={{ backgroundColor: '#DDD' }} />

      <View style={{marginBottom: 8}} />

      <Button 
        onPress={() => {

          if ( usuario.trim().length === 0 ) {
            return alert('Por favor, informe o usuário!')
          }

          if ( senha.length === 0 ) {
            return alert('Por favor, informe a senha!')
          }

          login(usuario, senha)
            .then((response) => {
              setToken(response.data.token)

              const partes_do_token = response.data.token.split('.')
              const buff = Buffer.from(partes_do_token[1], 'base64')
              const payload = buff.toString('utf-8')
              const payload_json = JSON.parse(payload)

              setAdmin( payload_json.admin )

              props.navigation.navigate('Listagem')
            })
            .catch((error) => alert(error + 'Não foi possível autenticar o usuário!'))
        }}
        title='Login' />
    </View>
  )
}