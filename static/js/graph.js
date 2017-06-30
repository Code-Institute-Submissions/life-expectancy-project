/**
 * Created by clairemitchell on 26/06/2017.
 */
queue()
   .defer(d3.json, "/projecttwo/lifeexpectancy")
   .await(makeGraphs);

function makeGraphs(error, lifeexpectancyproject) {

   //Create a Crossfilter instance
   var ndx = crossfilter(lifeexpectancyproject);
   var all = ndx.groupAll();

   //Define Dimensions
   var countryPie = ndx.dimension(function (d) {
       return d["country"];

   });

   var dateBar = ndx.dimension(function (d) {
      return d["year"];
   });

   var totalCountries = ndx.dimension(function (d) {
      return d["country_code"];
   });

   var genderBarM = ndx.dimension(function (d) {
      return d["male"];
   });

   var genderBarF = ndx.dimension(function (d) {
      return d["female"];
   });

   //Calculate metrics
   var numProjectsByCountry = countryPie.group();
   var numProjectsByDate = dateBar.group();
   var numProjectsByGenderM = genderBarM.group();
   var numProjectsBytotalCountries = totalCountries.group();

   var all = ndx.groupAll();

    var minDate = genderBarM.bottom(1)[0]["male"];
    var minDate = genderBarF.bottom(1)[0]["female"];
    var maxDate = totalCountries.top(1)[0]["country_code"]


   //Charts

   var countryPieChart = dc.pieChart("#country-chart");
   var genderRowChart = dc.rowChart("#gender-chart");
   var totalCountriesChart = dc.numberDisplay ("#number-countries");
   var dateBarChart = dc.barChart("#date-chart")

 selectField = dc.selectMenu('#countries-select')
       .dimension(totalCountries)
       .group(numProjectsBytotalCountries);

   countryPieChart
       .height(220)
       .radius(90)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(countryPie)
       .group(numProjectsByCountry);

   genderRowChart
       .width(300)
       .height(250)
       .dimension(genderBarM)
       .group(numProjectsByGenderM)
       .xAxis().ticks(4);

   totalCountriesChart
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);

   dateBarChart
       .width(800)
       .height(200)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateBar)
       .group(numProjectsByDate)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);

   dc.renderAll();
}