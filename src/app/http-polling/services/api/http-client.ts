const BASE_URL = 'http://localhost:4000/' as const;

export async function httpGet<T>(path: string, options?: RequestInit): Promise<T> {
    try {
        const response: Response = await fetch(`${BASE_URL}${path}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}: ${response.statusText}`);
        }

        const data: T = await response.json();

        return data;
    } catch (error) {
        console.log('API Error', error);
        throw error;
    }
}
