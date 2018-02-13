function isOdd(num) { return num % 2;}

// Create a Paper.js Path to draw a line into it:
var hexagon = new Path({closed: true});
// Color our path black
hexagon.strokeColor = 'black';
hexagon.strokeWidth = 2;
hexagon.fillColor = 'black';
hexagon.visible = false;
// How many points do we want our object to have
var points = 6;
// How large should it be
var radius = 10;
// 0 to 2PI is a circle, so divide that by the number of points
// in our object and that's how many radians we should put a new
// point in order to draw the shape
var angle = ((2 * Math.PI) / points);

// For as many vertices in the shape, add a point
for(i = 0; i < points; i++) {

  // Add a new point to the object
  hexagon.add(new Point(
    // Radius * Math.cos(number of radians of the point) is the x position
    radius * Math.cos(angle * i), 
    // And the same thing with Math.sin for the y position of the point
    radius * Math.sin(angle * i)
  ));
}

// Offset the shape so it's fully displayed on the canvas
hexagon.position.x += 100;
hexagon.position.y += 100;

map =[];
for(x = 0; x < 10; x++) {
  map[x] = [];
  for(y = 0; y < 10; y++) {
    hex = hexagon.clone()
    hex.onMouseEnter = function(event) {
        this.strokeColor = 'red';
        this.strokeWidth = 3;
    }
    
    hex.onMouseLeave = function(event) {
        this.strokeColor = 'black';
        this.strokeWidth = 2;
    }
    
    hex.onClick = function(event) {
        this.fillColor = 'red';
    }
    hex.visible = true;
    hex.position.x += x * ( 2 * radius  );
    hex.position.y += (y+ (.5 * isOdd(x))) * ( 2.2 * radius );
    map[x][y] = hex;
  }
}
