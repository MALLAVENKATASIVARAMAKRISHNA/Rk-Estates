from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Enum
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="buyer")  # 'buyer' or 'admin'
    created_at = Column(DateTime, default=datetime.utcnow)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    description = Column(String)
    land_length = Column(Float)
    land_width = Column(Float)
    num_plots = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)

    plots = relationship("Plot", back_populates="project", cascade="all, delete-orphan")

class Plot(Base):
    __tablename__ = "plots"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    plot_number = Column(Integer)
    length = Column(Float)
    width = Column(Float)
    area = Column(Float)
    row_index = Column(Integer)
    col_index = Column(Integer)
    facing = Column(String)  # N, S, E, W
    price = Column(Float, nullable=True)
    status = Column(String, default="Available")  # Available, Booked, Sold

    project = relationship("Project", back_populates="plots")
