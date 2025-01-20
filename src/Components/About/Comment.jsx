
export default function Comments({nombre, comentario, pfp}) {
    return (
        <div className="rounded-lg bg-gray-100 p-4 m-4 shadow w-1/3 flex justify-evenly dark:bg-neutral-600 dark:shadow-white">
            <img src={pfp} className="w-20 h-20 rounded-full mr-8 self-center" alt="user"/>
            <div>
                <h3>{nombre}</h3>
                <p className="italic">"{comentario}"</p>
            </div>
        </div>
    )

}