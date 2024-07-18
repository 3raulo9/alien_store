# Alien Store

Alien Store is a full-featured e-commerce application that provides a seamless shopping experience. The application includes user authentication, product management, cart operations, profile management, and translation services.

## Features

### Login & Registration
* Users can register for an account and log in to access their profile and manage their cart.

### Cart Management
* Users can add products to their cart, update quantities, and proceed to checkout.

### Profile Management
* Users can view and update their profile information, as well as view their purchase history.

### Product Listing
* Users can browse through a list of available products, view product details, and read reviews.

### Translation Services
* The application supports multiple languages, allowing users to translate the entire page content into their preferred language.

## Getting Started

### Prerequisites
* **Node.js**: Ensure you have Node.js installed on your machine. You can download it from [Node.js](https://nodejs.org/).
* **Python**: Ensure you have Python installed on your machine. You can download it from [Python](https://www.python.org/).
* **Docker**: Ensure you have Docker installed on your machine. You can download it from [Docker](https://www.docker.com/).

### Installation
git clone https://github.com/yourusername/alien-store.git
cd alien-store
cd backend
python -m venv venv
activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
cd ..
cd frontend
npm install
npm start
docker-compose up --build

## Running the App
Access the frontend: Open your browser and navigate to http://localhost:3000.
Access the backend: Open your browser and navigate to http://localhost:8000.

## Application Structure
### Backend (Django)
* The backend is built using Django and Django REST Framework.
* Key functionalities include user authentication, product management, and cart operations.
* API endpoints provide data to the frontend and support CRUD operations for products and user profiles.

### Frontend (React & Redux)
* The frontend is built using React and Redux for state management.
* Key functionalities include user registration and login, product browsing, cart management, and profile management.
* The TranslatorButton component allows users to switch languages and translate the page content.

### Translation
* The application supports multilingual capabilities.
* Text content is extracted from the DOM, sent for translation, and updated in the DOM with the translated text.
* The selected language persists even after a page refresh.

## Contributing
Contributions are welcome! Please follow these steps to contribute:
Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.