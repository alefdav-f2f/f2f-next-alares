import React from "react";
import LogoWhite from '@/img/alares-icon-white.png';
import LogoPurple from '@/img/alares-icon.png';
import Image from 'next/image'


const LogoIcon: React.FC<any> = ({ className, style, color }) => {

    let chosed = null;

    switch(color) {
        case 'white': {
            chosed = LogoWhite;
            break;
        }
        case 'purple': {
            chosed = LogoPurple;
            break;
        }
        default : {
            chosed = LogoWhite;
        }
    }

    return (
        <>
            <Image
                alt="Logo Alares Internet"
                src={chosed}
                className={className}
                style={style} />
        </>
    )
}

export default LogoIcon;