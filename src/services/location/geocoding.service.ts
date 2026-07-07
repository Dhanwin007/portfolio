interface Coordinates {

    latitude: number;

    longitude: number;

}

class GeocodingService {

    async getCoordinates(

        country: string,

        state: string,

        city: string

    ): Promise<Coordinates | null> {

        const query =
            encodeURIComponent(
                `${city}, ${state}, ${country}`
            );

        const response =
            await fetch(

                `https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2&limit=1`

            );

        if (!response.ok) {

            return null;

        }

        const result =
            await response.json();

        if (!result.length) {

            return null;

        }

        return {

            latitude:
                Number(result[0].lat),

            longitude:
                Number(result[0].lon),

        };

    }

}

export const geocodingService =
    new GeocodingService();