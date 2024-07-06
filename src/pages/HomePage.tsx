import {Urls} from "../App.tsx";

export function HomePage(){
    return (
        <>
            <div className={"flex place-items-center w-screen h-screen"}>
                <h1 className="text-3xl font-bold">
                    Voyageurs des sentiers
                </h1>
                <a href={Urls.Meteo}>Outil météo</a>
            </div>
        </>
    )
}
