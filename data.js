
//Data (JSON)
//https://cohesiondata.ec.europa.eu/resource/pi4w-3vc9.json
//EU Explanation page
//https://cohesiondata.ec.europa.eu/2014-2020/2014-2020-Financial-Allocations-by-Member-State-Br/pi4w-3vc9
//Wiki explanation of some funds
//https://en.wikipedia.org/wiki/Structural_Funds_and_Cohesion_Fund


var sortColumn = function(data,col,accessor)
{
    d3.select(col)
        .on("click",function()
    {
        data.sort(function(a,b) 
        { 
            return (accessor(a)-accessor(b));
        })
        makeTable(data,"ALL");
    })
}

var makeTableHeader = function(data)
{
    d3.select("#MS")
        .on("click",function()
    {
        makeTable(data.sort(function(a,b)
        {
            if(a.MS ==b.name ) { return 0; }
            if(a.MS < b.name ) { return -1; }
            if(a.MS > b.name ) { return 1; }
        }),"ALL")    
    })
    
    sortColumn(planets,"#moons",function(p){return p.moons});
    sortColumn(planets,"#distance",function(p){return p.distance});
    sortColumn(planets,"#img",function(p){return p.distance});
    sortColumn(planets,"#radius",function(p){return p.radius});
    sortColumn(planets,"#density",function(p){return p.density});
}

var setButtons = function(data)
{
    
    d3.select("#basic").on("click",function()
                        {
        makeTable(data,"ALL")
    });
    
    d3.select("#type").on("click",function()
                        {
        makeTable(planets,"Type")
    });
    
    d3.select("#fund").on("click",function()
                        {
        makeTable(planets,"Fund")
    });       
}

var makeTable = function(data,mode)
{
    d3.selectAll("tbody *").remove();
  
    var rows = d3.select("tbody")
    .selectAll("tr")
    .data(data)
    .enter()
    .append("tr");
    
    
    addCol(rows,function(data){return d."member-state"})
    
    rows.append("td")
        .append("img")
        .attr("src",function(planet)
        {
            return planet.img;
        })
        .attr("alt",function(planet)
        {
            return "Picture of "+planet.name;
        })
           
    addCol(rows,function(planet){return planet.moons})
    addCol(rows,function(planet){return planet.distance})
    addCol(rows,function(planet){return planet.radius})
    //addCol(rows,function(planet){return planet.density})
    rows.append("td")
        .text(function(planet){return planet.density})
        .attr("class",function(planet)
        {
                if(planet.density<2) { return "GASSY"; }
                else                 { return "ROCKY"; }
        })
}

var filterData = function(data,mode)
{
    if(mode=="ALL")
    {
        return data;       
    }
    else if (mode == "Type")
    {
        return data.filter(function(d)
        {
            return d.type;                      
        })
    }
    else if (mode == "Fund")
    {
        return Data.filter(function(d)
        {
            return d.fund;                      
        })
    }
    else
    {
        console.error("UNKNOWN fitler Type",mode);    
        return undefined;
    }
}

var addCol = function(rows,fcn)
{
    rows.append("td").text(fcn);
}






var setBanner = function(message)
{
    d3.select("#banner").text(message);
}


var appPromise = d3.json("https://cohesiondata.ec.europa.eu/resource/pi4w-3vc9.json")

appPromise.then(
function(data)
{
    setBanner("Here are the basic EU allocations");
    makeTableHeader(data);
    setButtons(data);
    makeTable(data,"ALL");
},
function(err)
{
    setBanner("No data today, try again");
});


