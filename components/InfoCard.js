import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from 'react-native'

export default function InfoCard(props) {
    const { description, value } = props
    return (
            <View style={estilos.card}>
                <Text>{description}: </Text>
                <Text>{value}</Text>
            </View>
    )
}

const estilos = StyleSheet.create({
    card : {
        borderColor : '#CCC',
        borderWidth : 1,
        display : 'flex',
        flexDirection : 'row',
        marginBottom : 8,
        padding: 8
    }
})
