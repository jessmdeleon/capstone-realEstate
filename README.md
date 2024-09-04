#Case de Busqueda - e-commerce Property search 

#Description 
Casa de Busqueda is a full stack e-commerce application focused on helping users search, buy, sell, and rent properties. The applications offers a dynamic property listing, user authentication, and a persistent in the favorites folder. 

Setup Instructions 
1. Clone the responsitory 
..bash 
git clone https://github.com/jessmdeleon/capstone-realEstate.git

2. ## Environment Variables
The following environment variables need to be configured:

- `DATABASE_URL`: The URL of the PostgreSQL database.
- `SECRET_KEY`: A secret key for encrypting sensitive data.

3. ## Database Schema
The application uses a PostgreSQL database with the following schema:

- **Users**
  - `id`: Primary Key
  - `username`: String
  - `email`: String
  - `password`: String (hashed)

- **Properties**
  - `id`: Primary Key
  - `title`: String
  - `description`: Text
  - `price`: Decimal
  - `location`: String
  - `type`: String (House, Apartment, etc.)
  - `status`: String (For Sale, For Rent, Sold)

- **Transactions**
  - `id`: Primary Key
  - `user_id`: Foreign Key (references Users)
  - `property_id`: Foreign Key (references Properties)
  - `transaction_date`: DateTime


4. ## API Documentation

### Base URL
The base URL for the API is: `http://localhost:5000/api`

### Endpoints

- **GET /properties**
  - Description: Get a list of all properties.
  - Example Request:
    ```bash
    curl -X GET http://localhost:5000/api/properties
    ```
  - Example Response:
    ```json
    [
      {
        "id": 1,
        "title": "Beautiful Family Home",
        "price": 450000,
        "location": "Atlanta, GA"
      },
      ...
    ]
    ```

- **POST /auth/login**
  - Description: Log in a user.
  - Example Request:
    ```bash
    curl -X POST http://localhost:3000/api/auth/login -d '{
      "username": "johndoe",
      "password": "password123"
    }'
    ```
  - Example Response:
    ```json
    {
      "token": "your_jwt_token"
    }
    ```

More endpoints can be added here...

5. ## Error Handling
The application currently includes basic error handling, such as returning appropriate status codes (e.g., 404 for not found, 500 for server errors). Future plans include more detailed error logging and user-friendly error messages.


6. ## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.


7. ## Contact
For any questions, feel free to reach out to [Jessica Morales-Deleon](https://github.com/jessmdeleon/capstone-realEstate/tree/main).


