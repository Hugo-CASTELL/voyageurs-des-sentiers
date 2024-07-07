import {useState} from "react";
import {getMeteoWebsites, MeteoWebSite} from "../utils/MeteoWebsites.ts";
import {MapContainer, Marker, TileLayer, useMapEvents} from "react-leaflet";
import {LatLng} from "leaflet";
import {useMarkers} from "../contexts/MarkerContext.tsx";

// #------------------#
// # Map interactions #
// #------------------#
interface MapEventsHandlerProps {
    setLatitude: (lat: string) => void;
    setLongitude: (lng: string) => void;
}

function MapEventsHandler({setLatitude, setLongitude}: MapEventsHandlerProps) {
    const markersContext = useMarkers();
    const map = useMapEvents({
        click(e) {
            const latlng: LatLng = e.latlng;
            if(latlng){
                // Get values
                const lat: number = latlng.lat;
                const lng: number = latlng.lng;

                // New marker on the map
                markersContext.cleanMarkers();
                markersContext.addMarker(lat, lng);
                map.flyTo({lat, lng});

                // Set them to search bar
                setLatitude(lat.toString());
                setLongitude(lng.toString());
            }
        },
    });
    return null;
}

// #-----#
// # Map #
// #-----#
const MapComponent: React.FC<MapEventsHandlerProps> = ({ setLatitude, setLongitude }) => {
    const { markers } = useMarkers();

    return (
        <MapContainer center={[47, 1.5]} zoom={5} scrollWheelZoom={true} style={{ width: '50vw', height: '50vh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]} />
            ))}
            <MapEventsHandler setLatitude={setLatitude} setLongitude={setLongitude} />
        </MapContainer>
    );
};

// #------#
// # Page #
// #------#
export function MeteoPage() {
    // #--------#
    // # States #
    // #--------#
    const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
    const [latitude, setLatitude] = useState<string>("");
    const [longitude, setLongitude] = useState<string>("");
    //const [latitudeSave, setLatitudeSave] = useState<string>("");
    //const [longitudeSave, setLongitudeSave] = useState<string>("");
    const [results, setResults] = useState<[string, string, string][]>();
    const mapMarkersContext = useMarkers();

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

            // Map markers
            if(mapMarkersContext.markers.length <= 0){
                const lat = parseFloat(latitude);
                const lng = parseFloat(longitude);
                mapMarkersContext.cleanMarkers();
                mapMarkersContext.addMarker(lat, lng);
            }
        }
    }


    return (
            <div className={"flex flex-col w-full h-full"}>
                {/* Inputs */}
                <div className={"flex justify-center space-x-4 lg:space-x-10 w-full h-[50px] max-h-[33px]"}>
                    {/* Latitude */}
                    <div className="w-1/4 h-full">
                        <input onChange={e => setLatitude(e.target.value)}
                               value={latitude}
                               className="shadow appearance-none border rounded w-full h-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="latitude" type="text" placeholder="Latitude"/>
                    </div>

                    {/* Longitude */}
                    <div className="w-1/4 h-full">
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

                <div className={"flex justify-center items-center w-full p-5"}>
                    {isMapOpen &&
                        <div id="map" className={"bg-slate-200 p-2 rounded"}>
                            <MapComponent setLatitude={setLatitude} setLongitude={setLongitude} />
                        </div>
                    }
                </div>

                {/* Result */}
                <div className={"flex justify-around items-center w-full h-[400px] overflow-auto"}>
                    {results && results.map((result: [string, string, string]) => {
                        return <a href={result[2]}
                                  key={result[0]}
                                  target="_blank"
                                  className={"flex flex-col w-48 bg-gray-50/30 dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-black shadow-sm hover:shadow-xl dark:shadow-slate-700 dark:hover:shadow-lg dark:hover:shadow-slate-600 transition duration-300 ease-in-out transform -translate-x-1/5"}
                        >
                            <div className={"inline-flex items-center justify-center"}>
                                <img src={`/logos/${result[0].toLowerCase()}.png`}
                                     alt={result[0]}
                                     className={"h-8 w-8 rounded shadow-lg"}
                                />
                            </div>
                            <p className={"text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight"}>{result[0]}</p>
                            <p className={"hidden lg:visible text-slate-500 dark:text-slate-400 mt-2 text-sm"}>{result[1]}</p>
                        </a>
                    })}
                </div>
            </div>
    )
}
