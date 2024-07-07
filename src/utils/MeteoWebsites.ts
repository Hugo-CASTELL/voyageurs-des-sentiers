export interface MeteoWebSite {
    name: string;
    desc: string;
    url: string;

    constructUrl(latitude: string, longitude: string, date: string): string;
}

class MeteoBlue implements MeteoWebSite {
    name: string = "meteoblue";
    desc: string = "Carte aéronautique";
    url: string = "https://www.meteoblue.com/fr/meteo/cartes/";
    zoom: number = 12;

    constructUrl(latitude: string, longitude: string, date: string): string {
        return this.url + "#coords=" + this.zoom + "/" + latitude + "/" + longitude;
    }
}

class Windy implements MeteoWebSite {
    name: string = "windy";
    desc: string = "Carte aéronautique";
    url: string = "https://www.windy.com/";
    zoom: number = 12;

    constructUrl(latitude: string, longitude: string, date: string): string {
        return this.url + "?" + latitude + "," + longitude + "," + this.zoom;
    }
}

class ECMWF implements MeteoWebSite {
    name: string = "ECMWF";
    desc: string = "Rapports météos";
    url: string = "https://charts.ecmwf.int/products/opencharts_meteogram?";
    epsgram: string = "epsgram=classical_15d";

    constructUrl(latitude: string, longitude: string, date: string): string {
        return this.url + this.epsgram + "&lat=" + latitude + "&lon=" + longitude;
    }
}

class Meteociel implements MeteoWebSite {
    name: string = "Meteociel";
    desc: string = "Prédictions en france";
    url: string = "https://www.meteociel.fr/modeles/arpege.php";

    constructUrl(latitude: string, longitude: string, date: string): string {
        return this.url;
    }
}

export function getMeteoWebsites(): MeteoWebSite[] {
    return [
        new MeteoBlue(),
        new Windy(),
        new ECMWF(),
        new Meteociel()
    ];
}
