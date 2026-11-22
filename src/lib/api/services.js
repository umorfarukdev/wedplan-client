const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllServices = async () => {
    const response = await fetch(`${BASE_URL}/services`);
    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }
    return response.json();
}

export const getServiceById = async (id) => {
    const response = await fetch(`${BASE_URL}/service/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch service");
    }
    return response.json();
}
