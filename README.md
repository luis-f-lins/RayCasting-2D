# RayCasting-2D
Web app that allows drawing of shapes and rays, and computes intersections between them.

This project was written in HTML, CSS and Javascript, using the P5 library. 

### There are 4 buttons on the app:
- the first one is used to draw polygons
- the second one is used to draw rays
- the third one is used to edit polygons and rays
- and the fourth and last one, clears the entire drawing.

In addition, there is an option to choose the background color of the drawing. 

**Polygons** are created by clicking on the points where the user wants to add new vertices, 
and are closed by double clicking where they want to add the last vertex. 

**Rays** are created using click and drag. This is important, because if you do not drag the ray, the end point will be at (0,0), which means the top left corner.

**Editing polygons and rays** can be done in four ways: 
- by dragging each vertex of the polygon
- dragging the entire polygon
- dragging the ray's initial vertex
- dragging the ray's arrowhead, to change its direction.

The computation of intersections is done at the same time that we create the ray and drag the final vertex. 
**Red** was used for the entry point into the polygon and **green** for the exit point.
 
