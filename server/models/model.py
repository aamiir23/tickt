from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

Base = declarative_base()


class Admin(Base):
    __tablename__ = "admins"

    admin_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone_number = Column(String)
    password = Column(String)

    # Define the relationship with Booking
    bookings = relationship("Booking", back_populates="admin")
    def check_password(self, password: str):
        return self.password == password


class Booking(Base):
    __tablename__ = "bookings"

    booking_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"))  # Define the foreign key
    flight_id = Column(Integer, ForeignKey("flights.flight_id"))
    qty = Column(Integer)
    booking_datetime = Column(DateTime)

    # Define the relationship with User
    user = relationship("User", back_populates="bookings")
    # Define the relationship with Flight
    flight = relationship("Flight", back_populates="bookings")
    # Define the relationship with Admin
    admin_id = Column(Integer, ForeignKey("admins.admin_id"))  # Add foreign key
    admin = relationship("Admin", back_populates="bookings")



class Flight(Base):
    __tablename__ = "flights"

    flight_id = Column(Integer, primary_key=True, index=True)
    departure_city = Column(String)
    arrival_city = Column(String)
    departure_datetime = Column(DateTime)
    arrival_datetime = Column(DateTime)
    seat_count = Column(Integer)

    # Define the relationship with Booking
    bookings = relationship("Booking", back_populates="flight")


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    phone_number = Column(String)
    password = Column(String)

    # Define the relationship with Booking
    bookings = relationship("Booking", back_populates="user")

    def check_password(self, password: str):
        return self.password == password
