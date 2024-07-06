export interface MeteoWebSite {
    name: string;
    desc: string;
    url: string;

    constructUrl(latitude: string, longitude: string, date: string): string;
}

class MeteoBlue implements MeteoWebSite {
    name: string = "meteoblue";
    desc: string = "Carte météorologique aéronautique";
    url: string = "https://www.meteoblue.com/fr/meteo/cartes/";
    zoom: number = 12;

    constructUrl(latitude: string, longitude: string, date: string): string {
        return this.url + "#coords=" + this.zoom + "/" + latitude + "/" + longitude;
    }
}

class Windy implements MeteoWebSite {
    name: string = "windy";
    desc: string = "Carte météorologique aéronautique";
    url: string = "https://www.windy.com/";
    zoom: number = 12;

    constructUrl(latitude: string, longitude: string, date: string): string {
        return this.url + "?" + latitude + "," + longitude + "," + this.zoom;
    }
}

export function getMeteoWebsites(): MeteoWebSite[] {
    return [
        new MeteoBlue(),
        new Windy()
    ];
}
