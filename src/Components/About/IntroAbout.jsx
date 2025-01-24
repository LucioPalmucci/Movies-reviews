import React from 'react';
import claqueta from '../../assets/claqueta.png';
import translations from '../translations.js';
export default function IntroAbout({language}) {
    const t = translations[language];
    return (
        <div className="flex p-10 m-6 justify-between bg-gray-100 font-Rubik rounded dark:bg-neutral-600 place-self-center w-75 ">
            <img src={claqueta} className="h-64" alt="claqueta"/>
            <div className="ml-16 flex flex-col justify-center">
                <h1 className="mb-6">{t.aboutUs}</h1>
                <p>{t.desc}</p>
            </div>
        </div>
    )
}