import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from '../../components/styles/GlobalStyle'
import { themes, ThemeTypes } from '../../components/styles/themes'

const PopupAppContainer = styled('div')`
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
    align-items: center;
    height: 200px;
    width: 300px;
    margin: 10px;
    background-color: ${(p) => p.theme.backgroundColor};
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    background-color: rgb(29, 185, 84);
    color: white;
    text-align: center;
    border: 2px solid black;
    border-radius: 20px;
`

interface Props {
    update: (arg: boolean) => void
    theme: ThemeTypes
}

class SignIn extends React.Component<Props> {
    messageValidation = () => {
        chrome.runtime.sendMessage({ message: 'login' }, (response) => {
            if (response.message === 'success') {
                this.props.update(true)
            }
        })
    }

    render() {
        return (
            <ThemeProvider theme={themes[this.props.theme]}>
                <React.Fragment>
                    <GlobalStyle />
                    <PopupAppContainer>
                        <div>SpotiAdd</div>
                        <Button id="sign-in" onClick={this.messageValidation}>
                            Login Using Spotify
                        </Button>
                    </PopupAppContainer>
                </React.Fragment>
            </ThemeProvider>
        )
    }
}

// const mapStateToProps = (state: IPopup) => {
// 	return {
// 		theme: state.settings.theme
// 	};
// };

export default SignIn
