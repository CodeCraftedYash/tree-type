export async function getParagraph() {
    const response = await fetch("api/paragraph");
    if(!response.ok){
        throw new Error("Failed to fetch the paragraph");
    }
    return response.json();
}