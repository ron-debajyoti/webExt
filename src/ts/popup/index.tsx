import * as React from 'react'
import ReactDOM from 'react-dom'
import Main from './containers/Main'
import { Token, Storage } from '../components/types/interfaces'
import { ThemeTypes } from './../components/styles/themes'
import SignIn from './containers/SignInPage'

const Handler = (props: { theme: ThemeTypes }) => {
    // const [authState, setAuthState] = React.useState(false)
    const auth: Token = Storage.get('tokenObject')
    const [authState, setAuthState] = React.useState<boolean>(auth.authStatus)
    const updateState = (state: boolean) => {
        setAuthState(state)
    }
    console.log(authState)
    if (!authState) {
        console.log('return sign in page')
        return <SignIn update={updateState} theme={props.theme} />
    }
    console.log('return main page')
    return <Main update={updateState} theme={props.theme} />
}

ReactDOM.render(
    <Handler theme={'light'} />,
    document.getElementById('popup-root')
)
