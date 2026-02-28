import math
from typing import List
from .. import models

def divide_land(project_id: int, land_length: float, land_width: float, num_plots: int) -> List[models.Plot]:
    """
    Auto plot division algorithm.
    1. Compute best grid fit (cols x rows)
    2. Calculate individual plot dimensions
    3. Generate plot records with grid positions and facing directions
    """
    # 1. Compute best grid fit
    cols = math.ceil(math.sqrt(num_plots))
    rows = math.ceil(num_plots / cols)

    # 2. Individual plot dimensions
    plot_length = land_length / cols
    plot_width = land_width / rows
    plot_area = plot_length * plot_width

    plots = []
    plot_counter = 1

    for r in range(rows):
        for c in range(cols):
            if plot_counter > num_plots:
                break
            
            # Determine facing (simplified logic)
            # Plots in row 0 face North, last row face South
            # Intermediate plots face East/West
            if r == 0:
                facing = "North"
            elif r == rows - 1:
                facing = "South"
            elif c == 0:
                facing = "West"
            else:
                facing = "East"

            new_plot = models.Plot(
                project_id=project_id,
                plot_number=plot_counter,
                length=plot_length,
                width=plot_width,
                area=plot_area,
                row_index=r,
                col_index=c,
                facing=facing,
                status="Available"
            )
            plots.append(new_plot)
            plot_counter += 1
            
    return plots
