### Getting Started
To get started, cd into the backend and run:

npm i --legacy-peer-deps




# Endpoints 

### Incomes--
## add Income
METHOD: POST

http://localhost:3000/api/v1/add-income/

Json Format: 
{
    "userId": "67a27b6038bb6e0e8d286df7",
    "title": "Updated Income Title addddd",
    "amount": 600.00,
    "category": "Updated Category",
    "date": "2025-04-10T00:00:00.000Z",
    "description": "Updated description for income"
}

## update Income
METHOD: POST

http://localhost:3000/api/v1/update-income/<IncomeObjectID>

json format: 

{
    
    "title": "Updated Income Titl 2e",
    "amount": 600.00,
    "category": "Updated Category",
    "date": "2025-04-10T00:00:00.000Z",
    "description": "Updated description for income"
}


## Delete Income
METHOD: DELETE

http://localhost:3000/api/v1/delete-income/<IncomeObjectID>



## get income
METHOD: GET

http://localhost:3000/api/v1/get-incomes/<UserObjectID>
##



### GEMINI API Key
https://ai.google.dev/gemini-api/docs/quickstart?lang=node
Follow the link above and select "Get a Gemini API key in Google AI Studio". Then Select "Create API Key".
once you have your API Key, Navigate to the Backend .env file and create a variable called "GOOGLE_AI_API_KEY=<YourAPIKeyHere>"


### BACKEND .env configuration
Add a port to the .env in the format below
PORT=<AddPortHere>

create a MongoDB atlas account and create a .env variable as seen below
MONGO_URL=<MongoDBAtlasURL>
For the Mongo URL, Google/Youtube "how to get Setup MongoDB and get URL for collection"

For GEMINI API Key .env variable, see the section above