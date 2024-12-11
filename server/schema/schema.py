from pydantic import BaseModel
import datetime
from typing import Optional


class FlightBase(BaseModel):
    departure_city: str
    arrival_city: str
    departure_datetime: datetime.datetime
    arrival_datetime: datetime.datetime
    seat_count: int = 60


class FlightCreate(FlightBase):
    pass


class Flight(FlightBase):
    flight_id: int

    class Config:
        from_attributes = True
        # orm_mode = True


class BookingBase(BaseModel):
    user_id: int
    flight_id: int
    qty: int
    booking_datetime: datetime.datetime  # Corrected field type


class BookingCreate(BookingBase):
    pass


class Booking(BookingBase):
    booking_id: int
    flight: Flight

    class Config:
        from_attributes = True
        # orm_mode = True





class UserBase(BaseModel):
    username: str
    email: str
    phone_number: str


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class User(UserBase):
    user_id: int

    class Config:
        from_attributes = True


class AdminBase(BaseModel):
    username: str
    email: str
    phone_number: str


class AdminCreate(AdminBase):
    password: str


class AdminLogin(BaseModel):
    email: str
    password: str


class Admin(AdminBase):
    admin_id: int

    # booking: Booking

    class Config:
        from_attributes = True


class BookingResponse(BaseModel):
    booking_id: int
    user: Optional[User]
    flight: Optional[Flight]
    qty: int
    booking_datetime: datetime.datetime
