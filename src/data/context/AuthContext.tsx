import { createContext, useEffect } from 'react'
import { User, onIdTokenChanged, signOut } from 'firebase/auth';
import Usuario from '../../models/Usuario'
import { useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebase/config';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'
import firebase from 'firebase/app'

const auth = app && getAuth(app);
interface AuthContextProps {
    usuario?: Usuario;
    carregando?: boolean
    loginGoogle?: () => Promise<void>;
    logout?: () => Promise<void>;
    login?: (email: string, senha:string) => Promise<void>;
    cadastrar?: (email: string, senha:string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken();
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token, 
        provedor: usuarioFirebase.providerData[0].providerId,
        imagemUrl: usuarioFirebase.photoURL
    };
} 
function gerenciarCookie(logado: boolean) {
    if(logado){
        Cookies.set('admin', logado, {
            expires: 7
        })
    } else {
        Cookies.remove('admin')
    }

}

export function AuthProvider(props) {
    const [usuario, setUsuario] = useState<Usuario>(null)
    const [carregando, setCarregando] = useState(true);
    const router = useRouter();

    async function configurarSessao(usuarioFirebase){
        if(usuarioFirebase?.email){
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario);
            setCarregando(false)
            gerenciarCookie(true);
            return usuario.email
        }else{
            setUsuario(null);
            setCarregando(true);
            gerenciarCookie(false);
        }
    }

    async function loginGoogle() {
        try{
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        setCarregando(true)
        await configurarSessao(result.user)
            router.push('/')
        }finally{
            setCarregando(false)
        }        
    }

    async function login (email, senha) {
        try{
            const result = await signInWithEmailAndPassword(auth ,email, senha);
            setCarregando(true);
            await configurarSessao(result.user);
            router.push('/'); 
        } finally {
            setCarregando(false)
        }
    }
    async function cadastrar (email: string, senha: string) {
        try{
            const result = await createUserWithEmailAndPassword(auth, email, senha);
            setCarregando(true);
            await configurarSessao(result.user);
            router.push('/'); 
        } finally {
            setCarregando(false)
        }
    }

    async function logout() {
        try{
        setCarregando(true)
        await signOut(auth)
        await configurarSessao(null)
        }finally {
            setCarregando(false)
        }
    }

    useEffect(() => {
        if(Cookies.get('admin')){
        const cancelar = onIdTokenChanged(auth, configurarSessao)
        return () => cancelar();
        }else {
            Cookies.remove('admin');
            setCarregando(false);
        }
    }, [])



    return(
        <AuthContext.Provider value={{
            usuario, loginGoogle, logout, carregando, login, cadastrar
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext