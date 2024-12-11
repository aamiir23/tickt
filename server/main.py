from fastapi import FastAPI
# import routes.routes as routes
from routes import routes
from database.database import Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5137",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# Create the database tables
Base.metadata.create_all(bind=engine)
print('created database successfully')

# Create FastAPI app
# app = FastAPI()

# Include routers from the routes module
app.include_router(routes.router, prefix="/api/v1", tags=["routes"])
