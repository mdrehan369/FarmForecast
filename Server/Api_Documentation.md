### Documentation for FarmForecast Postman Collection

This documentation provides detailed information about the API endpoints included in the **FarmForecast** Postman collection. Each section covers the method, request format, body parameters, and expected responses for each endpoint.

---

### 1. **Admin Endpoints**

#### 1.1 Create Admin
- **Endpoint**: `POST {{Server}}/api/v1/admins/register`
- **Description**: Registers a new admin by providing user details, address, and documents.
  
##### Request Body:
- **user** (object)
  - `type`: "ADMIN"
  - `firstName`: string
  - `lastName`: string
  - `email`: string
  - `password`: string
  - `phoneNumber`: string
- **address** (object)
  - `city`: string
  - `state`: string
  - `country`: string
  - `street`: string
  - `landmark`: string
  - `houseNumber`: string
  - `pinCode`: string
  - `zone`: string
- **documents** (object)
  - `voterIdNumber`: string
  - `voterIdPhoto`: string
  - `aadharCardNumber`: string
  - `aadharCardPhoto`: string
  - `panCardNumber`: string
  - `panCardPhoto`: string
  - `passportNumber`: string
  - `passportPhoto`: string
  - `drivingLicenceNumber`: string
  - `drivingLicencePhoto`: string

##### Response:
```json
{
  "statusCode": number,
  "data": {
    "id": number,
    "type": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phoneNumber": string,
    "address": [
      {
        "id": number,
        "city": string,
        "state": string,
        "country": string,
        "street": string,
        "landmark": string,
        "houseNumber": string,
        "pinCode": string,
        "zone": string
      }
    ],
    "documents": {
      "id": number,
      "voterIdNumber": string,
      "aadharCardNumber": string,
      "panCardNumber": string,
      "passportNumber": string,
      "drivingLicenceNumber": string
    }
  },
  "message": string,
  "success": boolean
}
```

#### 1.2 Admin Login
- **Endpoint**: `POST {{Server}}/api/v1/admins/login`
- **Description**: Authenticates the admin by phone number and password.

##### Request Body:
```json
{
  "phoneNumber": "6290197361",
  "password": "1234"
}
```

##### Response:
The response includes a JSON schema with the following fields:
- `statusCode`: number
- `data`: object
- `message`: string
- `success`: boolean

#### 1.3 Get Admin Details
- **Endpoint**: `GET {{Server}}/api/v1/admins`
- **Description**: Retrieves the details of the current logged-in admin.

##### Response:
The response contains the details of the admin, similar to the response format of the "Create Admin" endpoint.

#### 1.4 Admin Logout
- **Endpoint**: `GET {{Server}}/api/v1/admins/logout`
- **Description**: Logs out the admin from the system.

##### Response:
```json
{
  "statusCode": number,
  "data": object,
  "message": string,
  "success": boolean
}
```

#### 1.5 Register Staff
- **Endpoint**: `POST {{Server}}/api/v1/admins/staff`
- **Description**: Registers a new staff member with similar user, address, and document details as for admins.

##### Request Body:
```json
{
  "user": {
    "type": "STAFF",
    "firstName": "MD",
    "lastName": "Rehan",
    "email": "mdrehan1234@gmail.com",
    "password": "1234",
    "phoneNumber": "9477421012"
  },
  "address": {
    "city": "Kolkata",
    "state": "West Bengal",
    "country": "India",
    "street": "Karaya Road",
    "landmark": "Royal Sweets",
    "houseNumber": "18",
    "pinCode": "700017",
    "zone": "NORTH"
  },
  "documents": {
    "voterIdNumber": "<Staff's voterIdNumber>",
    "voterIdPhoto": "<Staff's voterIdPhoto>",
    "aadharCardNumber": "<Staff's aadharCardNumber>",
    "aadharCardPhoto": "<Staff's aadharCardPhoto>",
    "panCardNumber": "<Staff's panCardNumber>",
    "panCardPhoto": "<Staff's panCardPhoto>",
    "passportNumber": "<Staff's passportNumber>",
    "passportPhoto": "<Staff's passportPhoto>",
    "drivingLicenceNumber": "<Staff's drivingLicenceNumber>",
    "drivingLicencePhoto": "<Staff's drivingLicencePhoto>"
  }
}
```

#### 1.6 Get All Staffs
- **Endpoint**: `GET {{Server}}/api/v1/admins/staff`
- **Description**: Fetches details of all staff members.

---

### 2. **Staff Endpoints**

#### 2.1 Staff Login
- **Endpoint**: `POST {{Server}}/api/v1/staffs`
- **Description**: Authenticates staff members by their phone number and password.

##### Request Body:
```json
{
  "phoneNumber": "9477421002",
  "password": "1234"
}
```

#### 2.2 Get Current Staff Details
- **Endpoint**: `GET {{Server}}/api/v1/staffs`
- **Description**: Retrieves details of the current logged-in staff member.

#### 2.3 Staff Logout
- **Endpoint**: `GET {{Server}}/api/v1/staffs/logout`
- **Description**: Logs out the staff member from the system.

##### Response:
```json
{
  "statusCode": 0,
  "data": {},
  "message": "",
  "success": true
}
```

---

### Environment Variables:
- `Server`: `https://localhost:3000`

This documentation covers all the essential endpoints from the Postman collection. For specific responses, refer to the example JSON structures provided in the request descriptions.