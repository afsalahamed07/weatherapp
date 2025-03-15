import dotenv from "dotenv";
dotenv.config();

const googleApiKey = process.env.GEO_CODING_API as string;

export async function getCityFromCoordinates(lat: number, lon: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch city from coordinates");
  }

  const data = await response.json();
  if (data.status != "OK" || data.results.length === 0) {
    return null;
  }

  for (const result of data.results) {
    for (const component of result.address_components) {
      if (component.types.includes("locality")) {
        return component.long_name;
      }
    }
  }

  for (const result of data.results) {
    for (const component of result.address_components) {
      if (component.types.includes("administrative_area_level_1")) {
        return component.long_name;
      }
    }
  }

  return null;
}
