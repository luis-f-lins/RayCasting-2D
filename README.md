# RayCasting-2D
Webapp that allows drawing of shapes and rays, and computes intersections between them.

This project was written in HTML, CSS and Javascript, using the P5 library. 

There are 4 buttons on the site, the first one to draw polygons, the second one to draw rays, 
the third one to edit the polygons and rays, and the fourth and last one, to clear the entire drawing.

In addition, there is an option to choose the background color of the drawing. 

Polygons are created by clicking on the points where the user wants to add new vertices, 
and are closed by double clicking where they want to add the last vertex. 

The rays are created using click and drag. 

Editing polygons and rays can be done in four ways: by dragging each vertex of the polygon, dragging the entire polygon, 
dragging the ray's initial vertex, and dragging the ray's arrowhead, to change its direction.

The computation of intersections is done at the same time that we create the ray and drag the final vertex. 
Red was used for the entry point into the polygon and green for the exit point.
