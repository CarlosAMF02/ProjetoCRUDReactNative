import React, {
    useContext,
    useEffect,
    useState
} from 'react'
import {
    Button,
    FlatList,
    RefreshControl,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

import LoginContext from '../../contexts/LoginContext'

import {listagemLivros} from '../../services/LivrosService'

export default function Listagem(props) {

    const [isLoading, setIsLoading] = useState(false)

    const {admin, token} = useContext(LoginContext)

    const [livros, setLivros] = useState([])

    function listarLivros(token) {
        setIsLoading(true)
        listagemLivros(token)
            .then((response) => {
                setLivros(response.data)
                setIsLoading(false)
            })
            .catch((error) => {
                alert('Não foi possível listar os livros!')
                setIsLoading(false)
            })
    }

    useEffect(
        () => { 
            const unsubscribe = props.navigation.addListener('focus', () => {
                listarLivros(token) 
            })

            return unsubscribe
        }, 
        []
    )

    return (
        <View>
            {admin && (
                <Button 
                   onPress={() => {
                        props.navigation.navigate(
                            'Alteracao', { 
                                insercao : true 
                            }
                        )
                   }}
                   title='Inserir livro' />
            )}
            <FlatList 
                data={ livros }
                renderItem={ ({item}) => (
                    <TouchableOpacity 
                        onPress={() => props.navigation.navigate('Visualizacao', { admin, id: item.id })}
                        style={{ paddingHorizontal : 8, marginTop : 8 }}>
                        <Text>{item.nome}</Text> 
                    </TouchableOpacity>
                )}
                refreshControl={
                    <RefreshControl 
                        refreshing={ isLoading }
                        onRefresh={ () => listarLivros(token) }/>
                }/>
        </View>
    )
}