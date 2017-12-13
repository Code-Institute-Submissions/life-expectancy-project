# life-expectancy-project

https://shielded-stream-21193.herokuapp.com/

### Objectives

To graphically display the average life expectancy of men and women around the world over a 55 year period. 

### What does it do?

You can see the life expectancy of men and women across 37 countries between 1960 - 2015. The four graphs interact with each other displaying how life expectancy has changed in this time period.

### How does it work

The data for this site was stored in MongoDB. It uses Flask as a framework and is styled using CSS and Bootstrap. DC.js is  used to enable D3.js and Crossfilter.js to work together to manipulate the data and design graphics. The tour is created using intro.js.

### Road Blocks

When it came to labelling the x and y axis, an important part of identifying what each graph is showing, I ran up against a brick wall. Despite many attempts at various displays, z-index and colour changes, I was not able to solve the mystery in time. 


## Tech Used

### Some of the tech used includes:

- [Flask](http://flask.pocoo.org/)
 handles routing in Python
- [D3.js](https://d3js.org/)
  is used for the visual side of data manipulation 
- [Crossfilter.js](http://square.github.io/crossfilter/)
  is used for filtering the data
- [DC.js](https://dc-js.github.io/dc.js/)
  is used alongside D3 and Crossfilter to create dynamic visualisations
- [Bootstrap](http://getbootstrap.com/)
 is used to create a responsive layout
- [JavaScript](https://javascript.com/)
 is used for interactivity

## Charts

- Pie Chart displaying 39 countries and average life expectancy over 55 year period
- Composite Chart with year on the x axis and average life expectancy on the y axis
- Select chart in order to filter by country
- Bar graph with countries on the x axis and average life expectancy on the y axis

