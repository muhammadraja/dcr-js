var countryVal = ["Select one option","Population size","Number of borders","Number of timezones","Number of languages"];
var regionVal = ["Select one option","Number of countries in the region","Number of unique timezones in the region"];

var allRegions = ["Asia","Europe","Africa","Oceania","Americas","Polar"];

var allData = "";

// loading default values
window.addEventListener('load', function() {
    document.getElementById("primarySel").selectedIndex = "0"; 
	 document.getElementById("secondrySel").selectedIndex = "0";
	 
	// document.getElementById("bubTable").style.display = "none";
})

// function to load json file 
function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

// calling json loading function
loadJSON('countries.json',
         function(data) { 
		 allData = data;
		
		 
		 },
         function(xhr) { console.error(xhr); }
		 
);

// Change event listener for primary dropdown
document.getElementById('primarySel').onchange = function() {

var primary = document.getElementById("primarySel");
var secondary = document.getElementById("secondrySel");
var selection = primary.value;

// removing contents of secondary dropdown
while (secondary.options.length) {
        secondary.remove(0);
    }
	
var num = 0;
var numsec = 5;
	
// loading values related to countries in secondary dropdown
if(selection == 0)
{
	for (const val of countryVal) {
    var option = document.createElement("option");
    option.value = num;
    option.text = val;
    secondary.appendChild(option);
	num++;
	}
  }
  // loading values related to region in second dropdown
else if(selection == 1)
{
	for (const val of regionVal) {
    var option = document.createElement("option");
    option.value = numsec;
    option.text = val;
    secondary.appendChild(option);
	numsec++;
	}
}  

 
//byBorders();
}

// Change event listener for secondary dropdown
document.getElementById('secondrySel').onchange = function()
{
var secondary = document.getElementById("secondrySel");
var selVal = secondary.value;


if(selVal == 1)
{
	byPopulation(); // populate chart with population data
}
else if(selVal == 2)
{
	byBorders(); // populate chart with borders data
}
else if(selVal == 3)
{
	byTimezones(); // populate chart with timezones data
}
else if(selVal == 4)
{
	byLanguages(); // populate  chart with languages data
}
else if(selVal == 6)
{
byCountriesinregion(); // populate chart with no. of countries in region data
}
else if(selVal == 7)
{
bytimezonesinregion(); // populate chart with no. of unique timezones in a region data
}
}

// function to create dataset according to population size
function byPopulation()
{
	
var popData = { 
    children : [] 
};

for(var i=0;i<allData.length;i++)
{
var jsonData = {};
	jsonData["name"] = allData[i].alpha3Code;
	jsonData["value"] = allData[i].population;
	jsonData["tooltip"] = "Country: <b>" + allData[i].name + "</b><br>Population Size: " + allData[i].population + "<br>Number of Borders: " + allData[i].borders.length + "<br>Number of Languages: " +  allData[i].languages.length + "<br>Number of Timezones: " + allData[i].timezones.length;
	popData.children.push(jsonData);

}

document.getElementById("regionHeading").innerHTML = "Countries";
document.getElementById("paramHeading").innerHTML = "Population";
	createChart(popData);
	populateTable(popData);
}

// function to create dataset according to number of borders
function byBorders()
{
	
var popData = { 
    children : [] 
};

for(var i=0;i<allData.length;i++)
{
var jsonData = {};
	jsonData["name"] = allData[i].alpha3Code;
	jsonData["value"] = (allData[i].borders.length);
	jsonData["tooltip"] = "Country: <b>" + allData[i].name + "</b><br>Population Size: " + allData[i].population + "<br>Number of Borders: " + allData[i].borders.length + "<br>Number of Languages: " +  allData[i].languages.length + "<br>Number of Timezones: " + allData[i].timezones.length;
	popData.children.push(jsonData);

}

	document.getElementById("regionHeading").innerHTML = "Countries";
document.getElementById("paramHeading").innerHTML = "Number of Borders";
	createChart(popData);
	populateTable(popData);
}

// function to create dataset according to number of time zones
function byTimezones()
{
	
var popData = { 
    children : [] 
};

for(var i=0;i<allData.length;i++)
{
var jsonData = {};
	jsonData["name"] = allData[i].alpha3Code;
	jsonData["value"] = (allData[i].timezones.length);
	jsonData["tooltip"] = "Country: <b>" + allData[i].name + "</b><br>Population Size: " + allData[i].population + "<br>Number of Borders: " + allData[i].borders.length + "<br>Number of Languages: " +  allData[i].languages.length + "<br>Number of Timezones: " + allData[i].timezones.length;
	popData.children.push(jsonData);

}

	document.getElementById("regionHeading").innerHTML = "Countries";
document.getElementById("paramHeading").innerHTML = "Number of Timezones";
	createChart(popData);
	populateTable(popData);
}


// function to create dataset according to number of Languages
function byLanguages()
{
	
var popData = { 
    children : [] 
};

for(var i=0;i<allData.length;i++)
{
var jsonData = {};
	jsonData["name"] = allData[i].alpha3Code;
	jsonData["value"] = (allData[i].languages.length);
	jsonData["tooltip"] = "Country: <b>" + allData[i].name + "</b><br>Population Size: " + allData[i].population + "<br>Number of Borders: " + allData[i].borders.length + "<br>Number of Languages: " +  allData[i].languages.length + "<br>Number of Timezones: " + allData[i].timezones.length;
	popData.children.push(jsonData);

}

	document.getElementById("regionHeading").innerHTML = "Countries";
document.getElementById("paramHeading").innerHTML = "Number of Languages";
	createChart(popData);
	populateTable(popData);
}


// function for number of countries in the a region
function byCountriesinregion()
{
var popData = { 
    children : [] 
};

for(var j=0;j<allRegions.length;j++)
{
var curRegion = allRegions[j];
var regNum = 0;
for(var i=0;i<allData.length;i++)
{
if(curRegion == allData[i].region)
{
	regNum++;
}
}
var jsonData = {};
	jsonData["name"] = curRegion;
	jsonData["value"] = regNum;
	jsonData["tooltip"] = "Region: <b>" + curRegion + "</b><br>No. of Countries: " + regNum;
	popData.children.push(jsonData);	
}
	document.getElementById("regionHeading").innerHTML = "Regions";
document.getElementById("paramHeading").innerHTML = "Number of Countries";
	createChart(popData);
	populateTable(popData);
	//console.log(popData);
}

// function for unique timezones in the a region
function bytimezonesinregion()
{
var popData = { 
    children : [] 
};

for(var j=0;j<allRegions.length;j++)
{
var curRegion = allRegions[j];
var regNum = 0;
var timeArray = new Array();
for(var i=0;i<allData.length;i++)
{
if(curRegion == allData[i].region)
{
for(var k=0;k<allData[i].timezones.length;k++)
{
	timeArray.push(allData[i].timezones[k]);
}
	
}
}

var unique = timeArray.filter(onlyUnique);

var jsonData = {};
	jsonData["name"] = curRegion;
	jsonData["value"] = unique.length;
	jsonData["tooltip"] = "Region: <b>" + curRegion + "</b><br>No. of Unique Timezones: " + unique.length;
	popData.children.push(jsonData);	
}
document.getElementById("regionHeading").innerHTML = "Regions";
document.getElementById("paramHeading").innerHTML = "Number of Unique Timezones";
	createChart(popData);
	populateTable(popData);
	//console.log(popData);
}

// function for getting unique Array
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


// function to create Chart
function createChart(popData)
{

// Empty the container div for chart
var div = document.getElementById('showChart');
while(div.firstChild){
    div.removeChild(div.firstChild);
}

// create the bubble chart
	var diameter = 800;
        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var bubble = d3.pack(popData)
            .size([diameter, diameter])
            .padding(1.5);
			
			
        var svg = d3.select("#showChart")
            .append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");

        var nodes = d3.hierarchy(popData)
            .sum(function(d) { return d.value; });

        var node = svg.selectAll(".node")
            .data(bubble(nodes).descendants())
            .enter()
            .filter(function(d){
                return  !d.children
            })
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        node.append("title")
            .text(function(d) {
               // return d.name + ": " + d.value;
            });

        node.append("circle")
            .attr("r", function(d) {
                return d.r;
            })
            .style("fill", function(d,i) {
                return color(i);
            });

        node.append("text")
            .attr("dy", ".2em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.name.substring(0, d.r / 2);
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", function(d){
                return d.r/3;
            })
            .attr("fill", "white");

        node.append("text")
            .attr("dy", "1.3em")
            .style("text-anchor", "middle")
            .text(function(d) {
                return d.data.value;
            })
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr("font-size", function(d){
                return d.r/3;
            })
            .attr("fill", "white");
			
			node.on("mouseover",function(d) {
      Tooltip.style("opacity", 1)
    } )
      .on("mousemove", function(d)
			{
			 Tooltip
        .html(d.data.tooltip)
        .style("left", (d.x+350) + "px")
        .style("top", (d.y) + "px")
		.style("cursor", "pointer")
		//console.log(d.x);
			})
      .on("mouseleave", function(d) {
 
 Tooltip.style("opacity", 0)
			});

        d3.select(self.frameElement)
            .style("height", diameter + "px");

// create a tooltip
    var Tooltip = d3.select("#showChart")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    
		

}

// function to populate table
function populateTable(popData)
{
//document.getElementById("bubTable").style.display = "block";
//document.getElementById("bubTable").style.width = "100%";
//alert(document.getElementById("bubTable").rows.length);


var popStr = "";
for(var i=0;i<popData.children.length;i++)
{
	popStr += "<tr><td>" + popData.children[i].name + "</td><td>" +  popData.children[i].value + "</td></tr>"; 
}

document.getElementById("bubTable").querySelector("tbody").innerHTML = popStr;
}
