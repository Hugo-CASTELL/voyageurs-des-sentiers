import {useState} from "react";
import {getMeteoWebsites, MeteoWebSite} from "../utils/MeteoWebsites.ts";

export function MeteoPage() {
    // #--------#
    // # States #
    // #--------#
    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    const [results, setResults] = useState<[string, string, string][]>();

    // #---------#
    // # Classes #
    // #---------#
    const classes: MeteoWebSite[] = getMeteoWebsites();

    // #-------------#
    // # Get results #
    // #-------------#
    function search(): void{
        if(latitude && longitude)
            setResults(classes.map((website: MeteoWebSite) => {return [website.name, website.desc, website.constructUrl(latitude, longitude, '')] }));
    }

    return (
        <div className={"flex flex-col w-full h-full"}>
            {/* Inputs */}
            <div className={"flex justify-center space-x-10 w-full h-[50px]"}>
                {/* Latitude */}
                <div className="mb-4 w-1/4 h-full">
                    <input onChange={e => setLatitude(e.target.value)}
                           className="shadow appearance-none border rounded w-full h-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="latitude" type="text" placeholder="Latitude"/>
                </div>

                {/* Longitude */}
                <div className="mb-4 w-1/4 h-full">
                    <input onChange={e => setLongitude(e.target.value)}
                           className="shadow appearance-none border rounded w-full h-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="longitude" type="text" placeholder="Longitude"/>
                </div>

                {/* Opening map */}
                <button onClick={() => setIsMapOpen(!isMapOpen)}
                        type="button"
                        className="flex justify-center items-center bg-gray-200 hover:bg-gray-300 font-semibold w-10 h-full rounded focus:outline-none focus:shadow-outline">
                    <img src={"/assets/pushpin.png"}
                         alt="Opening map"
                         className={"w-6 mx-1"}
                    />
                </button>

                {/* Search */}
                <button onClick={() => search()}
                        type="button"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold h-full px-4 rounded focus:outline-none focus:shadow-outline">
                            Rechercher
                </button>
            </div>

            <div>
                {isMapOpen &&
                    <div>
                        hello
                    </div>
                }
            </div>

            {/* Result */}
            <div className={"flex flex-col justify-center items-center w-full h-[1000px]"}>
                {results && results.map((result: [string, string, string]) => {
                    return <a href={result[2]}
                              key={result[0]}
                              target="_blank"
                              className={"bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"}
                    >
                        <div>
                            <img src={`/logos/${result[0]}.png`} alt={result[0]}/>
                        </div>
                        <p>{result[0]}</p>
                        <p>{result[1]}</p>
                    </a>
                })}
            </div>
        </div>
    )
}
