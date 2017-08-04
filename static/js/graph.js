/**
 * Created by clairemitchell on 26/06/2017.
 */
queue()
   .defer(d3.json, "/projecttwo/lifeexpectancy")
   .await(makeGraphs);

function makeGraphs(error, lifeJSON) {

    countries = [];

   //Create a Crossfilter instance
    var lifeexpectancyproject = lifeJSON;
    var dateFormat = d3.time.format("%Y-%m-%d");
    lifeexpectancyproject.forEach(function (d) {
        d["year"] = dateFormat.parse(d["year"]+"-1-1");
        d["year"].setDate(1);
        if (countries.indexOf(d["country"]) === -1) {
          countries.push(d["country"]);
        }
    });
   var ndx = crossfilter(lifeexpectancyproject);
   var all = ndx.groupAll();

   //Define Dimensions
   var countryPie = ndx.dimension(function (d) {
       return d["country"];
   });

   var totalCountries = ndx.dimension(function (d) {
       return d["country"];
   });
   //
   var genderBar = ndx.dimension(function (d) {
       return d["year"];
   });

   var decadeBar = ndx.dimension(function (d) {
       return d["country"];
   });

   var genderPie = ndx.dimension(function (d) {
       return d["gender"];
    });

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

    var numProjectsByCountry = countryPie.group().reduce(reduceAdd,
reduceRemove, reduceInitial);

   var numProjectsByGenderM = genderBar.group().reduce(reduceAddM,
reduceRemoveM, reduceInitial);

   var numProjectsByGenderF = genderBar.group().reduce(reduceAddF,
reduceRemoveF, reduceInitial);

    var numProjectsByDecadeM = decadeBar.group().reduce(reduceAddM,
reduceRemoveM, reduceInitial);

    var numProjectsByDecadeF = decadeBar.group().reduce(reduceAddF,
reduceRemoveF, reduceInitial);

 //   var numProjectsByGenderM = genderPie.group().reduce(reduceAddM,
  // reduceRemoveM, reduceInitial);

    //var numProjectsByGenderF = genderPie.group().reduce(reduceAddF,
    //reduceRemoveM, reduceInitial);



   var countryGroup = totalCountries.group();

   // //Charts

   var countryPieChart = dc.pieChart("#country-chart");
   var genderCompositeChart = dc.compositeChart("#gender-chart");
   var decadeBarChart = dc.compositeChart("#decade-bar")
    var genderPieChart = dc.pieChart("#gender-piechart")

 selectField = dc.selectMenu('#countries-select')
       .dimension(totalCountries)
       .group(countryGroup);


   countryPieChart
       .width(600)
       .height(400)
       .radius(200)
       .innerRadius(10)
       .transitionDuration(1500)
       .dimension(countryPie)
       .group(numProjectsByCountry)
       .valueAccessor(function(p) { return p.value.count > 0 ?
p.value.total / p.value.count : 0;
       });

   var colorScale = d3.scale.ordinal().range(['#ffffff', '#ffe6e6', '#ffcccc', '#ffb3b3', '#ff9999', '#ff8080', '#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000', '#e60000', '#cc0000'
, '#b30000', '#990000', '#800000', '#660000', '#4d0000', '#330000', '#1a0000', '#000000']);
    countryPieChart.colors(colorScale);

   genderCompositeChart
       .width(600)
       .height(400)
       .dimension(genderBar)
       .group(numProjectsByGenderF)
       .transitionDuration(500)
       .x(d3.time.scale().domain([new Date("1960-1-1"), new
Date("2016-1-1")]))
       .xAxisLabel("Year")
       .y(d3.scale.linear().domain([30, 90]))
       .yAxisLabel("Average Life Expectancy")

.compose([dc.lineChart(genderCompositeChart).group(numProjectsByGenderM).colors(['#ff4d4d']).valueAccessor(function(kv)
{ return kv.value.average }),

dc.lineChart(genderCompositeChart).group(numProjectsByGenderF).colors(['#990000']).valueAccessor(function(kv)
{ return kv.value.average })]);

   decadeBarChart
       .width(800)
       .height(400)
       .dimension(decadeBar)
       .transitionDuration(500)
       .x(d3.scale.ordinal().domain(countries))
       .xUnits(dc.units.ordinal)
       .xAxisLabel("Countries")
       .y(d3.scale.linear().domain([30, 90]))
       .yAxisLabel("Average Life Expectancy")

.compose([dc.barChart(decadeBarChart).group(numProjectsByDecadeM).colors(['#ff4d4d']).valueAccessor(function(kv)
{ return kv.value.average }),
dc.barChart(decadeBarChart).group(numProjectsByDecadeF).colors(['#990000']).valueAccessor(function(kv)
{ return kv.value.average })]);

   genderPieChart
       .width(400)
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(genderPie)
       .group(numProjectsByCountry)
       .valueAccessor(function(p) { return p.value.count > 0 ?
p.value.total / p.value.count : 0;
       });


   dc.renderAll();
}