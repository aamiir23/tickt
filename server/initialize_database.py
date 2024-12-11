from sqlalchemy import create_engine, Column, String
from sqlalchemy.orm import sessionmaker
from models.model import Base, Admin, Booking, Flight, User

# Use the existing SQLite database
engine = create_engine("sqlite:///flight_booking.db")

# Reflect the existing tables
Base.metadata.reflect(bind=engine)

# Drop the existing Admin table if it exists
if 'admins' in Base.metadata.tables:
    Base.metadata.tables['admins'].drop(bind=engine)

# Recreate the Admin table according to the model and schema
Base.metadata.tables['admins'].create(bind=engine)
#
# # Create a sessionmaker
# Session = sessionmaker(bind=engine)
#
# # Create a session
# session = Session()
#
# # Example: Create a new user
# new_user = User(username="example_user", email="user@example.com", phone_number="1234567890", password="password123")
# session.add(new_user)
# new_user = User(username="test", email="test@email.com", phone_number="1234567890", password="testpassword")
# session.add(new_user)
# new_user = User(username="example_user", email="example@example.com", phone_number="1234567890", password="password123")
# session.add(new_user)
# session.commit()
#
# # Example: Query all users
# users = session.query(User).all()
# for user in users:
#     print(user.username, user.email)
#
# # Close the session
# session.close()
