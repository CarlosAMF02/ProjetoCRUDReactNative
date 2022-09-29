import React, {useContext, useEffect, useState} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import { visualizarLivro, removerLivro } from '../../services/LivrosService'

import LoginContext from '../../contexts/LoginContext'
import InfoCard from '../../components/InfoCard'

export default function Visualizacao(props) {
    const [livro, setLivro] = useState({})

    const {admin, id} = props.route.params
    const {token} = useContext(LoginContext)

    useEffect(
        () => { 
            visualizarLivro(token, id)
            .then((response) => {
                setLivro(response.data)
            })
            .catch((error) => {
                alert('Não foi possível encontrar este livro!')
            })
        }, 
        []
    )

    const remover = () => {
        removerLivro(token, id)
        props.navigation.navigate('Listagem')
    }

    return (
        <SafeAreaView>
            <View style={{ padding : 16 }}>
                <InfoCard description={'Nome'} value={livro.nome}/>
                <InfoCard description={'Autor'} value={livro.autor}/>
                <InfoCard description={'Quantidade de páginas'} value={livro.paginas}/>

                { admin && (
                    <TouchableOpacity style={estilos.removeButton} onPress={remover}>
                        <Text style={estilos.removeButtonText}>Remover</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    removeButton : {
        borderColor : '#F8F8FF',
        borderWidth : 1,
        backgroundColor: '#FF0000',
        padding: 8
    },
    removeButtonText : {
        color : '#F8F8FF',
        fontSize : 16,
        fontWeight : 'bold',
        textAlign : 'center'
        
    }
})
