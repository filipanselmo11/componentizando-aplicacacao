import { Icone } from './Icone';

import { ButtonHTMLAttributes } from 'react';

import '../styles/botao.scss';

interface PropsBotao extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    iconName: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    selected: boolean;
}

export function Botao({ iconName, title, selected, ...rest}: PropsBotao) {
    return (
        <button type="button" {...(selected && { className: 'selected'})} {...rest}>
            <Icone name={iconName} color={selected ? '#FAE800' : '#FBFBFB'}/>
            {title}
        </button>
    );
}