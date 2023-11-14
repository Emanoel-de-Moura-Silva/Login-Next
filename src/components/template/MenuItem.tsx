import Link from 'next/link'

interface MenuItemProps {
    url?: string
    texto: string
    icone: any
    onClick?: (event: any) => void
    classname?: string
}

export default function MenuItem(props: MenuItemProps) {

    function renderizarConteudo() {
        return(
        <div className={`
        flex flex-col justify-center items-center
        h-20 w-20
        text-gray-600 
        dark:text-gray-200 ${props.classname}
        `}>
                    {props.icone}
                    <span className={`text-xs font-light `}>
                        {props.texto}
                    </span>
        </div>
    )}
    return (
        <li onClick={props.onClick} className={`
        hover:bg-gray-100 dark:hover:bg-slate-800
         cursor-pointer
         `}>
            {props.url ? (
                <Link href={props.url}>
                {renderizarConteudo()} 
                </Link>
            ): (
                renderizarConteudo()
            )}
        </li>
    )
}