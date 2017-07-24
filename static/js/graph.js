/**
 * Created by clairemitchell on 26/06/2017.
 */
queue()
   .defer(d3.json, "/projecttwo/lifeexpectancy")
   .await(makeGraphs);

function makeGraphs(error, lifeJSON) {

   //Create a Crossfilter instance
    var lifeexpectancyproject = lifeJSON;
    var dateFormat = d3.time.format("%Y-%m-%d");
    lifeexpectancyproject.forEach(function (d) {
        d["year"] = dateFormat.parse(d["year"]+"-1-1");
        d["year"].setDate(1);
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

  // var avleGraph = ndx.dimension(function (d) {
    //   return d["year"];
   //});

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

    var numProjectsByCountry = countryPie.group().reduce(reduceAdd, reduceRemove, reduceInitial);

   var numProjectsByGenderM = genderBar.group().reduce(reduceAddM, reduceRemoveM, reduceInitial);

   var numProjectsByGenderF = genderBar.group().reduce(reduceAddF, reduceRemoveF, reduceInitial);


   var countryGroup = totalCountries.group();

   // //Charts

   var countryPieChart = dc.pieChart("#country-chart");
   var genderCompositeChart = dc.compositeChart("#gender-chart");
   //var AvleBarGraph = dc.barGraph("#bar-graph")

 selectField = dc.selectMenu('#countries-select')
       .dimension(totalCountries)
       .group(countryGroup);


   countryPieChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(countryPie)
       .group(numProjectsByCountry)
       .valueAccessor(function(p) { return p.value.count > 0 ? p.value.total / p.value.count : 0;
       });

   genderCompositeChart
       .width(800)
       .height(400)
       .dimension(genderBar)
       .group(numProjectsByGenderF)
       .transitionDuration(500)
       .x(d3.time.scale().domain([new Date("1960-1-1"), new Date("2016-1-1")]))
       .xAxisLabel("Year")
       .y(d3.scale.linear().domain([30, 90]))
       .yAxisLabel("Average Life Expectancy")
       .compose([dc.lineChart(genderCompositeChart).group(numProjectsByGenderM).colors(['#aa00ff']).valueAccessor(function(kv) { return kv.value.average }),
           dc.lineChart(genderCompositeChart).group(numProjectsByGenderF).colors(['#00aaff']).valueAccessor(function(kv) { return kv.value.average })]);

   //AvleBarGraph

      // .width(800)
      // .dimension(avleGraph)
      // .transitionDuration(500)
       //.x(d3.time.scale().domain([new Date("1960-1-1"), new Date("2016-1-1")]))
       //.xAxisLabel("Year")
       //.compose([dc.lineChart(AvleGraph).group(numProjectsByGenderM).colors(['#aa00ff']).valueAccessor(function(kv) { return kv.value.average }),
      //     dc.lineChart(AvleGraph).group(numProjectsByGenderF).colors(['#00aaff']).valueAccessor(function(kv) { return kv.value.average })]);


   dc.renderAll();
}