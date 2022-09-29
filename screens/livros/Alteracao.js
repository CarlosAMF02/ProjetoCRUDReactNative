import React, {useContext, useState} from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

import { cadastrarLivro } from '../../services/LivrosService'

import LoginContext from '../../contexts/LoginContext'

export default function Alteracao(props) {

    const {token} = useContext(LoginContext)

    const [nome, setNome] = useState('')
    const [numeroPaginas, setNumeroPaginas] = useState(0)
    const [autor, setAutor] = useState('')

    const { insercao } = props.route.params
    let title = 'Inserir livro'

    if ( ! insercao  ) {
        title = 'Editar livro'
    }

    props.navigation.setOptions({ title })

    return (
        <View style={{ padding : 16 }}>
            <Text>Nome do livro:</Text>
            <TextInput 
                onChangeText={(txt) => setNome(txt)}
                style={ estilos.input }
                value={ nome }/>

            <Text>Número de páginas:</Text>
            <TextInput 
                onChangeText={(txt) => setNumeroPaginas(txt)}
                style={ estilos.input }
                value={ numeroPaginas } />

            <Text>Autor do livro:</Text>
            <TextInput 
                onChangeText={ (txt) => setAutor(txt) }
                style={ estilos.input }
                value={ autor }/>

            <Button 
                onPress={() => {
                    if ( nome.trim().length === 0 ) {
                        return alert('Por favor, informe o nome do livro!')
                    }

                    const regexNumeroInteiro = /^[0-9]+$/
                    if ( ! regexNumeroInteiro.test(numeroPaginas) ) {
                        return alert('Por favor, informe o número de páginas apenas com números inteiros!')
                    }

                    if ( autor.trim().length === 0 ) {
                        return  alert('Por favor, informe o autor do livro!')
                    }

                    // Chamar a API
                    if ( insercao ) {
                        cadastrarLivro(token, nome, numeroPaginas, autor)
                            .then((response) => {
                                alert('Cadastro realizado com sucesso!')
                                props.navigation.goBack()
                            })
                            .catch((error) => alert('Não foi possível inserir o livro!'))
                    } else {
                        // Alteração de livro
                    }
                }}
                title='Salvar' />
        </View>
    )
}

const estilos = StyleSheet.create({
    input : {
        borderColor : '#CCC',
        borderWidth : 1,
        marginBottom : 8
    }
})
