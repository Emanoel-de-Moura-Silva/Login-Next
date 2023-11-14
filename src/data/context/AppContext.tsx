import { createContext, useEffect, useState } from "react";


interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}


const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {
    const [tema, setTema] = useState('dark');

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : '';
        setTema(novoTema)
        /* localStorage: permite armazenar dados no navegador da web do usuário, sem um prazo de validade definido, ou seja, mesmo após o usuário fechar o navegador ou reiniciar o computador, os dados armazenados permanecerão disponíveis.*/
        localStorage.setItem('tema', novoTema)
    }
    /*useEffect é utilizado para recuperar um valor de tema salvo anteriormente no localStorage e, em seguida, atualizar o estado do componente com o valor recuperado.*/
    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo)
    }, [])
    return(
        <AppContext.Provider value={{
            tema,
            alternarTema
        }}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppContext;