import { Ajuste, Home, Sair, Sino } from "../icons";
import MenuItem from "./MenuItem";
import Logo from "./Logo";
import useAuth from "../../data/hooks/useAuth";

export default function MenuLateral() {
    const {logout} = useAuth()
    return(
        <aside className={`
        flex flex-col
        dark:bg-gray-950
        bg-gray-200 text-gray 700"
    `}>
            <div className={`
             flex flex-col items-center justify-center
             bg-gradient-to-r dark:from-slate-600 dark:to-black  from-slate-500 to-white
             h-20 w-20 rounded
             `}>
                <Logo/>
            </div>
            <ul className="flex-grow ">
                <MenuItem url="/" texto="Início" icone={Home}/>
                <MenuItem url="/ajustes" texto="Ajustes" icone={Ajuste}/>
                <MenuItem url="/notificacoes" texto="Notificações" icone={Sino}/>
            
            </ul>
            <ul>
            <MenuItem  texto="Sair" icone={Sair} onClick={logout} classname={
                `text-red-600 dark:text-red-400
                 hover:bg-red-400 hover:dark:text-white
                 hover:text-white`}/>
            </ul>
        </aside>
    )
}