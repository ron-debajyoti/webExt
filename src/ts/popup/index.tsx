import * as React from 'react'
import ReactDOM from 'react-dom'
import Main from './containers/Main'
import { ThemeTypes } from './../components/styles/themes'
import SignIn from './containers/SignInPage'

const Handler = (props: { theme: ThemeTypes }) => {
    const [authState, setAuthState] = React.useState(false)
    const updateState = (state: boolean) => {
        setAuthState(state)
    }
    console.log(authState)
    if (!authState) {
        return <SignIn update={updateState} theme={props.theme} />
    }
    return <Main update={updateState} theme={props.theme} />
}

ReactDOM.render(
    <Handler theme={'light'} />,
    document.getElementById('popup-root')
)
