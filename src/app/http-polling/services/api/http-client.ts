export async function httpGet<T>(path: string, options?: RequestInit): Promise<T> {
    try {
        const response: Response = await fetch(path, {
            method: 'GET',
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}: ${response.statusText}`);
        }

        const data: T = await response.json();

        return data;
    } catch (error) {
        console.error('API Error', error);
        throw error;
    }
}
