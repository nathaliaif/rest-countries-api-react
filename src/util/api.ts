const JSON_URL = "/data.json";

export async function getData() {
    try {
        const response = await fetch(JSON_URL);
        if (!response.ok) {
            throw new Error (`Response status: ${response.status}`)
        }

        const json = await response.json();
        return(json);
    } catch(error: unknown){
        if (error instanceof Error) {
            console.log(error.message);
        } else {
            console.log("Unknown error", error);
        }
    }
}