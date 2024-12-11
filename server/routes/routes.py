from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from database.database import SessionLocal
import models.model as model
import schema.schema as schema
from typing import List, Optional
from datetime import datetime

router = APIRouter()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/users/", response_model=schema.User)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    db_user = model.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@router.post("/login/", response_model=schema.User)
def login_user(request: schema.UserLogin, db: Session = Depends(get_db)):
    user = db.query(model.User).filter(model.User.email == request.email).first()
    if not user or not user.check_password(request.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return user


@router.post("/admin/login/", response_model=schema.Admin)
def login_user(request: schema.AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(model.Admin).filter(model.Admin.email == request.email).first()
    if not admin or not admin.check_password(request.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return admin


@router.get("/users/", response_model=list[schema.User])
def read_users(db: Session = Depends(get_db)):
    return db.query(model.User).all()


@router.get("/admin/", response_model=list[schema.Admin])
def read_admins(db: Session = Depends(get_db)):
    return db.query(model.Admin).all()


@router.post("/admin/", response_model=schema.Admin)
def create_admin(admin: schema.AdminCreate, db: Session = Depends(get_db)):
    db_admin = model.Admin(**admin.dict())
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


@router.get("/users/{user_id}", response_model=schema.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(model.User).filter_by(user_id=user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(model.User).filter_by(user_id=user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    db.close()


@router.post("/flights/", response_model=schema.Flight)
def create_flight(flight: schema.FlightCreate, db: Session = Depends(get_db)):
    db_flight = model.Flight(**flight.dict())
    db.add(db_flight)
    db.commit()
    db.refresh(db_flight)
    return db_flight


@router.post("/booking/", response_model=schema.Booking)
def create_booking(booking: schema.BookingCreate, db: Session = Depends(get_db)):
    # Create a new booking
    db_booking = model.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)

    # Update the number of seats in the flights table
    flight = db.query(model.Flight).filter(model.Flight.flight_id == booking.flight_id).first()
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")

    # Reduce the number of seats by the quantity booked
    flight.seat_count -= booking.qty
    if flight.seat_count < 0:
        raise HTTPException(status_code=400, detail="Not enough seats available")

    db.commit()

    return db_booking


# @router.get("/booking/", response_model=list[schema.Booking])
# def read_booking(db: Session = Depends(get_db)):
#     return db.query(model.Booking).all()
@router.get("/bookings/", response_model=List[schema.BookingResponse])  # Adjust response_model to List[schema.Booking]
def read_bookings( db: Session = Depends(get_db)):
    db_bookings = db.query(model.Booking).filter_by().all()

    # Check if bookings exist for the specified user
    if not db_bookings:
        raise HTTPException(status_code=404, detail="Bookings not found")

    # Iterate through each booking and access flight information
    # for booking in db_bookings:
    #     flight_information = booking.flight  # Access flight information for the current booking
    #     # Now you can access attributes of the flight object, such as flight_id, departure_city, etc.
    #     flight_id = flight_information.flight_id
    #     departure_city = flight_information.departure_city
    #     arrival_city = flight_information.arrival_city
    #     # and so on...
    return db_bookings


@router.get("/bookings/{user_id}", response_model=list[schema.Booking])
def read_booking(user_id: int, db: Session = Depends(get_db)):
    db_bookings = db.query(model.Booking).filter_by(user_id=user_id).all()

    # Check if bookings exist for the specified user
    if not db_bookings:
        raise HTTPException(status_code=404, detail="Bookings not found")

    # Iterate through each booking and access flight information
    # for booking in db_bookings:
    #     flight_information = booking.flight  # Access flight information for the current booking
    #     # Now you can access attributes of the flight object, such as flight_id, departure_city, etc.
    #     flight_id = flight_information.flight_id
    #     departure_city = flight_information.departure_city
    #     arrival_city = flight_information.arrival_city
    #     # and so on...
    return db_bookings


@router.get("/flights/", response_model=list[schema.Flight])
def read_flights(db: Session = Depends(get_db)):
    return db.query(model.Flight).all()


@router.get("/flights/{flight_id}", response_model=schema.Flight)
def read_flight(flight_id: int, db: Session = Depends(get_db)):
    db_flight = db.query(model.Flight).filter_by(flight_id=flight_id).first()
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return db_flight


@router.post("/flights/search", response_model=List[schema.Flight])
def search_flights(
        departure_city: Optional[str] = Query(None),
        arrival_city: Optional[str] = Query(None),
        departure_datetime: Optional[str] = Query(None),
        arrival_datetime: Optional[str] = Query(None),
        seat_count: Optional[int] = Query(None),
        db: Session = Depends(get_db)
):
    filters = {}

    if departure_city:
        filters['departure_city'] = departure_city
    if arrival_city:
        filters['arrival_city'] = arrival_city

    if departure_datetime:
        departure_datetime = datetime.fromisoformat(departure_datetime)
        filters['departure_datetime'] = departure_datetime
    if arrival_datetime:
        arrival_datetime = datetime.fromisoformat(arrival_datetime)
        filters['arrival_datetime'] = arrival_datetime

    if seat_count:
        filters['seat_count'] = seat_count
    if filters:
        db_flights = db.query(model.Flight).filter_by(**filters).all()
    else:
        db_flights = db.query(model.Flight).all()

    if not db_flights:
        raise HTTPException(status_code=404, detail="Flights not found")

    return db_flights



@router.delete("/flights/{flight_id}", status_code=204)
def delete_flight(flight_id: int, db: Session = Depends(get_db)):
    db_flight = db.query(model.Flight).filter_by(flight_id=flight_id).first()
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    db.delete(db_flight)
    db.commit()
    db.close()
@router.delete("/booking/{booking_id}", status_code=204)
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    db_flight = db.query(model.Booking).filter_by(booking_id=booking_id).first()
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    db.delete(db_flight)
    db.commit()
    db.close()
@router.put("/flights/{flight_id}", status_code=204)
def update_flight(flight_id: int, flight: schema.FlightCreate, db: Session = Depends(get_db)):
    db_flight = db.query(model.Flight).filter_by(flight_id=flight_id).first()
    if not db_flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    # Update the flight details
    for var, value in vars(flight).items():
        setattr(db_flight, var, value)  # Set attribute values from the FlightCreate model
    db.commit()
    return None
