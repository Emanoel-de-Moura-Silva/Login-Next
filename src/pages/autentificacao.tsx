import { useState } from "react"
import AuthInput from "../components/auth/Authinput"
import icon from '../components/icons/Google Icon.png'
import Image from 'next/image';
import img from '../components/icons/33.png'
import { Alerta } from "../components/icons";
import useAuth from "../data/hooks/useAuth";

export default function Autentificacao() {


    const {loginGoogle, login, cadastrar} = useAuth()

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [modo, setModo] = useState<'login' | 'cadastro'>('login');
    const [error, setError] = useState("");

    function handlesubmit() {
        if(modo === 'login'){
            console.log('login')
            ExibirError('Ocorreu um erro no login!')
        }else {
            console.log('cadastrar')
            ExibirError('Ocorreu um erro no Cadastro!')
        }

    }
    function ExibirError(msg, tempo = 10){
        setError(msg)
        setTimeout(() => {
           setError(null) 
        }, tempo * 1000);
    }  
   async function Submeter(event: React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        try{
        if(modo === 'login'){
            login(email, senha)
        } else {
            cadastrar(email, senha)

        }
    } catch (e) {
       ExibirError(e.message)
       console.log(e.message) 
    }
    }
    return(
        <div className={` 
        flex h-screen items-center justify-center bg-slate-700
        `}>
            <div className={`w-1/2 hidden md:block md:w-1/2 lg:w-2/3`}>
               <Image src={img}  alt="Lendas"  className="h-screen w-full object-cover" />
            </div>
            <div className={`
             m-10 w-full md:w-1/2 lg:w-1/3
            `}>
                <h1 className="tex.xl font-bold mb-5 text-white" > {modo === 'login' ? 'Entre com a sua Conta': 'Cadastre sua Conta'}  </h1>
                {error ? (
                     <div className={`
                         bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg
                        flex items-center
                     `}>
                         {Alerta()}
                         <span className="ml-3 ">{error}</span>
                     </div>
                ): 
                false
                }

                <AuthInput label="Email"
                 valor={email}
                 tipo="email"
                 valorMudou={setEmail}
                 obrigatorio
                 />
                 <AuthInput label="Senha"
                 valor={senha}
                 tipo="password"
                 valorMudou={setSenha}
                 obrigatorio 
                 />
                 <button onClick={Submeter} className={`
                 w-full bg-yellow-400 hover:bg-yellow-500
                 text-white rounded-lg px-4 py-3 mt-6
                    
                 `}>
                    {modo === "login" ? "Entrar" : "Cadastra-se" }
                 </button>
                 <hr  className="my-6 border-gray-300 w-full"/>

                 <button onClick={loginGoogle} className={`
                 flex items-center justify-center w-full
                bg-blue-500 hover:bg-blue-600
                 text-white rounded-lg px-4 py-3 
                 `}>

                    <Image src={icon} alt="Icone do Google" className={`w-8 h-8 mr-4 rounded-full`}/>
                    Entra com o Google
                 </button>
                 {modo === 'login' ? (
                    <p className=" mt-8 text-white">
                        Novo por aqui?
                         <a onClick={() => setModo('cadastro')} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer ml-1`}>
                            Crie uma Conta
                         </a>   
                    </p>
                 ): (
                    <p className=" mt-8 text-white">
                         Possui uma conta?
                         <a onClick={() => setModo('login')} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer ml-1`}>
                             Faça Login
                         </a>   
                    </p>
                 )}
           </div>    
        </div>
    )
}