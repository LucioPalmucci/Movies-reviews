import React from 'react';
import translations from '../translations.js';
export default function IntroAbout({language}) {
    const t = translations[language];
    return (
        <div className="flex p-10 m-6 justify-between bg-gray-100 font-Rubik rounded dark:bg-neutral-600">
            <img src="/claqueta.png" className="w-20 h-20" alt="claqueta"/>
            <div className="w-1/2">
                <h1 className="mb-6">{t.aboutUs}</h1>
                <p>{t.desc}</p>
            </div>
        </div>
    )
}