export type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type WeatherResult = {
  name: string;
  temp: number;
  description: string;
  icon: string;
};

const USERS_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';
const WEATHER_ENDPOINT = 'https://wttr.in';

/**
 * Fetches the mock user list from JSONPlaceholder.
 * Throws on non-2xx responses or network failures so callers can
 * drive their own loading/error UI.
 */
export async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(USERS_ENDPOINT);

  if (!response.ok) {
    throw new Error(`Failed to load users (status ${response.status})`);
  }

  const data: ApiUser[] = await response.json();
  return data;
}

/**
 * Fetches current weather conditions for a city using wttr.in's JSON API.
 * Throws if the city can't be resolved or the request fails.
 */
export async function fetchWeather(city: string): Promise<WeatherResult> {
  const trimmedCity = city.trim();

  if (!trimmedCity) {
    throw new Error('City name is required');
  }

  const query = encodeURIComponent(trimmedCity);
  const response = await fetch(`${WEATHER_ENDPOINT}/${query}?format=j1`);

  if (!response.ok) {
    throw new Error(`City not found (status ${response.status})`);
  }

  const data = await response.json();
  const current = data?.current_condition?.[0];
  const area = data?.nearest_area?.[0];

  if (!current) {
    throw new Error('No weather data available for this city');
  }

  return {
    name: area?.areaName?.[0]?.value ?? trimmedCity,
    temp: Number(current.temp_C ?? 0),
    description: current.weatherDesc?.[0]?.value ?? 'Unknown',
    icon: current.weatherIconUrl?.[0]?.value ?? '',
  };
}