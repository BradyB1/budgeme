// const API_BASE_URL = "http://localhost:3000/api/v1"; 
const API_BASE_URL = "https://budgeme.onrender.com/api/v1"; 

export async function fetchFinancialTip(userId, refresh = false) {
    try {
        console.log("Fetching AI Tip (Refresh:", refresh, ")");
        const timestamp = new Date().getTime();
        
        const response = await fetch(`${API_BASE_URL}/financial-tips/${userId}?refresh=${refresh}&_=${timestamp}`, {
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
        console.log("AI Tip Data:", data);
        return data.tip;
    } catch (error) {
        console.error("Error fetching AI tip:", error);
        return "Unable to generate financial advice at this time.";
    }
}
