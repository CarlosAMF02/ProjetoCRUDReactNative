import axios from 'axios'

const URL_BASE = 'http://10.0.2.2:3000'

function login(usuario, senha) {
    return axios({
        url : URL_BASE + '/login',
        method: 'post',
        data : {
            usuario,
            senha
        }
    })
}

function listagemLivros(token) {
    return axios({
        url : URL_BASE + '/livros',
        method : 'get',
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })
}

function cadastrarLivro(token, nome, paginas, autor) {
    return axios({
        url : URL_BASE + '/livros',
        method : 'post',
        headers : {
            'Authorization' : 'Bearer ' + token
        },
        data : {
            nome,
            paginas,
            autor
        }
    })
}

function visualizarLivro(token, id) {
    return axios({
        url : URL_BASE + '/livros/'+id,
        method : 'get',
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    })
}

function removerLivro(token, id) {
    return axios({
        url : URL_BASE + '/livros/'+id,
        method : 'delete',
        headers : {
            'Authorization' : 'Bearer ' + token
        }
    }) 
}

export { login, listagemLivros, cadastrarLivro, visualizarLivro, removerLivro }