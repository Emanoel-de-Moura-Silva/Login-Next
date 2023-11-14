import Link from "next/link"
import useAuth from "../../data/hooks/useAuth"
import Image from 'next/image';
import img from '../icons/User.png'

interface AvatarProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarProps) {
    const {usuario} = useAuth()
    return(
        <Link href="./perfil">
            <Image src={usuario?.imagemUrl ?? img} alt="Avatar" 
            className={`
            w-10 h-10
            rounded-full cursor-pointer
            ${props.className}
            `}
            width={50}
            height={50}
        />
        </Link>
        
    )
}