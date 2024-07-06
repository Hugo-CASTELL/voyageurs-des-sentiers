import {useMemo, useRef, useState} from "react";
import {getMeteoWebsites, MeteoWebSite} from "../utils/MeteoWebsites.ts";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import {LatLng, map} from "leaflet";

export function MeteoPage() {
    // #--------#
    // # States #
    // #--------#
    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [mapMarkers, setMapMarkers] = useState<{lat: number,lng: number}[]>([]);
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
        if(latitude && longitude){
            setResults(classes.map((website: MeteoWebSite) => {return [website.name, website.desc, website.constructUrl(latitude, longitude, '')] }));

            if(mapMarkers.length <= 0){
                let lat = parseFloat(latitude);
                let lng = parseFloat(longitude);
                setMapMarkers([{ lat, lng }]);
            }
        }
    }

    // #------------------#
    // # Map interactions #
    // #------------------#
    function MapEventsHandler(){
        const map = useMapEvents({
            click(e) {
                let latlng: LatLng = e.latlng;
                if(latlng){
                    // Get values
                    let lat: number = latlng.lat;
                    let lng: number = latlng.lng;

                    // Set them
                    setLatitude(lat.toString());
                    setLongitude(lng.toString());

                    // New marker on the map
                    setMapMarkers([{ lat, lng }]);
                    map.flyTo({lat, lng});
                }
            },
        });
        return null;
    }

    return (
        <div className={"flex flex-col w-full h-full"}>
            {/* Inputs */}
            <div className={"flex justify-center space-x-10 w-full h-[50px]"}>
                {/* Latitude */}
                <div className="mb-4 w-1/4 h-full">
                    <input onChange={e => setLatitude(e.target.value)}
                           value={latitude}
                           className="shadow appearance-none border rounded w-full h-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="latitude" type="text" placeholder="Latitude"/>
                </div>

                {/* Longitude */}
                <div className="mb-4 w-1/4 h-full">
                    <input onChange={e => setLongitude(e.target.value)}
                           value={longitude}
                           className="shadow appearance-none border rounded w-full h-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="longitude" type="text" placeholder="Longitude"/>
                </div>

                {/* Opening map */}
                <button onClick={() => setIsMapOpen(!isMapOpen)}
                        type="button"
                        className={"flex justify-center items-center" + ( isMapOpen ? " bg-gray-300 hover:bg-gray-200 " : " bg-gray-200 hover:bg-gray-300 ") + "font-semibold w-10 h-full rounded focus:outline-none focus:shadow-outline"}>
                    <img src={"/assets/pushpin.png"}
                         alt="Opening map"
                         className={"w-6 mx-1"}
                    />
                </button>

                {/* Search */}
                <button onClick={() => search()}
                        type="button"
                        className={"bg-blue-500 hover:bg-blue-700 text-white font-semibold h-full px-4 rounded focus:outline-none focus:shadow-outline"}>
                            Rechercher
                </button>
            </div>

            <div className={"flex justify-center items-center w-full"}>
                {isMapOpen &&
                    <div id="map" className={"bg-slate-200 p-2 m-5 rounded"}>
                        <MapContainer center={[47, 1.5]} zoom={5} scrollWheelZoom={true} style={{width:'50vw', height:'50vh'}}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {mapMarkers.map((marker, idx) => (
                                <Marker key={idx}
                                        draggable={false}
                                        position={[marker.lat, marker.lng]} />
                            ))}
                            <MapEventsHandler />
                        </MapContainer>
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
