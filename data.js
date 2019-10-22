//I would like to create 1 column of a table that displays the image of each penguin
var appPromise = d3.json("/penguins/classdata.json");
appPromise.then(
    function(data)
        {
          makeTable; 
        }) 

var makeTable = function(penguins)
{
    //d3.select("#mainTable").remove();
  
    var rows = d3.select("#mainTable")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr");
    
    addCol(rows,function(penguins)
           {
           return penguins.picture
           });
     
    rows.append("td")
        .append("img")
        .attr("src",function(d)
        {
            return d.picture;
        });
                   
}

 