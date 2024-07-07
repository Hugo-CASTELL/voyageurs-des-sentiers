import {Urls} from "../App.tsx";
import {Link} from "react-router-dom";

export function HomePage(){
    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <div className={"flex flex-col space-y-3 text-slate-900 dark:text-white"}>
                <h1 className="text-3xl font-bold mb-16">
                    Voyageurs des sentiers
                </h1>
                <div className={"flex justify-around"}>
                    <Link to={Urls.Meteo}
                          className={"flex flex-col w-48 bg-gray-50/30 dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-sm hover:shadow-xl dark:shadow-slate-700 dark:hover:shadow-lg dark:hover:shadow-slate-600 transition duration-300 ease-in-out transform -translate-x-1/5"}
                    >
                    <div className={"inline-flex items-center justify-center"}>
                        <img src={"/assets/pepeprayformeteo.webp"}
                             alt={"pepe pray for meteo"}
                             className={"h-8 w-8 rounded shadow-lg"}
                        />
                    </div>
                    <p className={"text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight"}>Outil météo</p>
                </Link>
                </div>
            </div>
        </div>
    )
}
