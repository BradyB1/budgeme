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