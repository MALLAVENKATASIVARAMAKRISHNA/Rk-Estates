from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from .. import database, models, schemas, dependencies
from ..services import plot_division

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("/", response_model=List[schemas.Project])
def get_projects(db: Session = Depends(database.get_db)):
    return db.query(models.Project).all()

@router.get("/{id}", response_model=schemas.Project)
def get_project(id: int, db: Session = Depends(database.get_db)):
    project = db.query(models.Project).filter(models.Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/", response_model=schemas.Project, status_code=status.HTTP_201_CREATED)
def create_project(
    project: schemas.ProjectCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(dependencies.admin_only)
):
    new_project = models.Project(
        name=project.name,
        location=project.location,
        description=project.description,
        land_length=project.land_length,
        land_width=project.land_width,
        num_plots=project.num_plots
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    
    # Auto-generate plots
    plots = plot_division.divide_land(
        new_project.id, 
        project.land_length, 
        project.land_width, 
        project.num_plots
    )
    db.add_all(plots)
    db.commit()
    db.refresh(new_project)
    
    return new_project

@router.put("/{id}", response_model=schemas.Project)
def update_project(
    id: int,
    project_update: schemas.ProjectCreate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(dependencies.admin_only)
):
    project = db.query(models.Project).filter(models.Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    for key, value in project_update.dict().items():
        setattr(project, key, value)
        
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(
    id: int,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(dependencies.admin_only)
):
    project = db.query(models.Project).filter(models.Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    db.delete(project)
    db.commit()
    return None
