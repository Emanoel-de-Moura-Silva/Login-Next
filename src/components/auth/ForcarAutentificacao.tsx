import Image from 'next/image'
import loading from '../../../public/load.gif'
import useAuth from '../../data/hooks/useAuth'
import { useRouter } from 'next/router';

export default function ForcarAutenticacao(props) {
    const {usuario, carregando} = useAuth();
    const router = useRouter();
    function renderizarConteudo() {
        return (
            <>
                {props.children}
            </>
        )
    }
    function renderizarCarregando() {
        return(
            <div className={'flex justify-center items-center h-screen bg-slate-700'}>
                <Image src={loading} alt='carregamento' />
            </div>
        )
    }
    if(!carregando && usuario?.email){
        return renderizarConteudo();

    } else if(carregando){
        return renderizarCarregando();
    }else {
        router.push('autentificacao')
        return null
    }
    
}