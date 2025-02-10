const API_BASE_URL = "http://localhost:3000/api/v1"; // CHANGE FOR DEPLOYMENTs
export async function fetchFinancialTip(userId) {
    try {
        //Add a cache-busting timestamp to the request URL
        const timestamp = new Date().getTime();
        const response = await fetch(`${API_BASE_URL}/financial-tips/${userId}?_=${timestamp}`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch AI tip");
        }

        const data = await response.json();
        return data.tip;
    } catch (error) {
        console.error("Error fetching AI tip:", error);
        return "Unable to generate financial advice at this time.";
    }
}
