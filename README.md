# life-expectancy-project

## Overview

### Objectives

This page intends to break down the average life expectancy of men and women around the world over a 55 year period. 

### What does it do?

The idea is that you are able to filter by each of the 39 countries in order to access male and female stats on life expectancy from 1960 - 2015. This then allows you to see more clearly how the average life expectancy was calculated and has changed from 1960 - 2015.

### How does it work

The data for this site was stored in MongoDB. This website uses Flask as a framework and is styled using CSS and Bootstrap. DC.js is then used to enable D3.js and Crossfilter.js to work together to manipulate the data and design graphics. The tour is created using intro.js. 


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

## Functions

These were the functions written in order to filter data separately for male and female ages and also for each country and year.

function reduceAdd(p, v) {
        ++p.count;
        p.total += (v["male"] + v["female"]) / 2;
        p.average = p.total / p.count;
        return p;
    }

    function reduceRemove(p, v) {
        --p.count;
        p.total -= (v["male"] + v["female"]) / 2;
        p.average = p.total / p.count;
        return p;
    }

    function reduceInitial() {
        return {count: 0, total: 0, average: 0};
    }

    function reduceAddM(p, v) {
        ++p.count;
        p.total += v["male"];
        p.average = p.total / p.count;
        return p;
    }

    function reduceRemoveM(p, v) {
        --p.count;
        p.total -= v["male"];
        p.average = p.total / p.count;
        return p;
    }


    function reduceAddF(p, v) {
        ++p.count;
        p.total += v["female"];
        p.average = p.total / p.count;
        return p;
    }

    function reduceRemoveF(p, v) {
        --p.count;
        p.total -= v["female"];
        p.average = p.total / p.count;
        return p;
    }

