from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class PlotBase(BaseModel):
    plot_number: int
    length: float
    width: float
    area: float
    row_index: int
    col_index: int
    facing: str
    price: Optional[float] = None
    status: str = "Available"

class PlotCreate(PlotBase):
    pass

class Plot(PlotBase):
    id: int
    project_id: int

    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    name: str
    location: str
    description: str
    land_length: float
    land_width: float
    num_plots: int

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    plots: List[Plot] = []

    class Config:
        from_attributes = True

class PlotStatusUpdate(BaseModel):
    status: str
