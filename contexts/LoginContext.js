import React, {
    createContext,
    useState
} from 'react'

const LoginContext = createContext({})

function LoginProvider(props) {
    const [token, setToken] = useState('')
    const [admin, setAdmin] = useState(false)

    return (
        <LoginContext.Provider value={{ token, setToken, admin, setAdmin }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContext

export { LoginProvider }