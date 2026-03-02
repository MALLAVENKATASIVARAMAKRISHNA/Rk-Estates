from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, schemas, dependencies

router = APIRouter(prefix="/api/plots", tags=["plots"])

@router.get("/{id}/dimensions")
def get_plot_dimensions(id: int, db: Session = Depends(database.get_db)):
    plot = db.query(models.Plot).filter(models.Plot.id == id).first()
    if not plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    return {
        "length": plot.length,
        "width": plot.width,
        "row_index": plot.row_index,
        "col_index": plot.col_index,
        "facing": plot.facing
    }

@router.get("/{id}", response_model=schemas.Plot)
def get_plot(id: int, db: Session = Depends(database.get_db)):
    plot = db.query(models.Plot).filter(models.Plot.id == id).first()
    if not plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    return plot

@router.put("/{id}/status", response_model=schemas.Plot)
def update_plot_status(
    id: int,
    status_update: schemas.PlotStatusUpdate,
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(dependencies.admin_only)
):
    plot = db.query(models.Plot).filter(models.Plot.id == id).first()
    if not plot:
        raise HTTPException(status_code=404, detail="Plot not found")
    
    plot.status = status_update.status
    db.commit()
    db.refresh(plot)
    return plot
