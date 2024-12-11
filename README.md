# Tickt

Tickt is a full-stack web application aimed at enhancing the airline ticket booking process. The project showcases a blend of backend excellence, frontend interactivity, structured schema, and robust CRUD functionality.

## Features

- **Backend Excellence**: Utilized Python FastAPI, SQLAlchemy, Pydantic, and SQLite for efficient data management and backend operations.
- **Frontend Interactivity**: Employed Vite, React, React hooks, Context-API, axios, and React Router for dynamic frontend interactions, enhancing user engagement.
- **Structured Schema and Coding Practices**: Established a well-organized project architecture adhering to industry standards. Implemented clear routing mechanisms for different user roles, enhancing accessibility and security.
- **Robust CRUD Functionality**: Integrated comprehensive CRUD operations to manage airline ticket booking processes seamlessly.

## Project Structure

- `client/`: Contains the frontend code built with React using Vite.
- `server/`: Contains the backend code built with FastAPI.
- `server/docs/`: Contains the backend Database schema and project structure documentation.

## Installation and Setup

### Prerequisites

- Node.js and npm installed on your machine.
- Python installed on your machine.

### Backend Setup

1. Navigate to the `server/` directory.
2. Create a virtual environment: `python -m venv venv`.
3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS and Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`.
5. Run the backend server: `uvicorn main:app --reload`.

### Frontend Setup

1. Navigate to the `client/` directory.
2. Install dependencies: `npm install`.
3. Run the frontend server: `npm run dev`.

## Usage

Once both the backend and frontend servers are running, you can access the Tickt application by visiting `http://localhost:5137` in your web browser.

## Conclusion

Tickt is a comprehensive solution for managing airline ticket bookings, showcasing the capabilities of modern technologies like FastAPI, React, and more. With its intuitive interface and efficient backend operations, Tickt aims to streamline the ticket booking process for users.
