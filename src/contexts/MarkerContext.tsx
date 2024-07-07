import React, {createContext, useState, useContext, ReactNode} from 'react';

// Define the Marker interface
interface Marker {
    lat: number;
    lng: number;
}

// Define the context type
export interface MarkerContextType {
    markers: Marker[];
    addMarker: (lat: number, lng: number) => void;
    cleanMarkers: () => void;
}

// Create the context with a default value
const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

// Create the provider component
export const MarkerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [markers, setMarkers] = useState<Marker[]>([]);

    const addMarker = (lat: number, lng: number) => {
        setMarkers([{ lat, lng }]);
    };

    const cleanMarkers = () => {
        setMarkers([]);
    };

    return (
        <MarkerContext.Provider value={{ markers, addMarker, cleanMarkers }}>
            {children}
        </MarkerContext.Provider>
    );
};

// Create a custom hook to use the MarkerContext
export const useMarkers = (): MarkerContextType => {
    const context = useContext(MarkerContext);
    if (!context) {
        throw new Error('useMarkers must be used within a MarkerProvider');
    }
    return context;
};