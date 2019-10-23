//I would like to create 2 columns of a table: the first displays the image of each penguin, the second displays the final score

var appPromise = d3.json("/penguins/classdata.json");
appPromise.then(
    function(penguins)
        {
          makeTable(penguins); 
        }) 
//brings my data in, and calls the function to draw the table.

var makeTable = function(penguins)
{
    //This function draws my table, and I hope redraws it with each new button click
    //d3.select("#mainTable").remove();
  
    var rows = d3.select("#mainTable")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr");
    //This was my attempt to create new table rows, but I'm not sure if there's data in them.
    
    //addCol(rows,function(penguins)
           //{
          // return penguins.picture
           //});
    //This was my attempt to add a column of penguin images, but I don't know if I need the following block of code:
     
    rows.append("td")
        .append("img")
        .attr("src",function(d)
        {
            return "penguins/" + d.picture;
        //look at why "penguins" etc.
        });

    rows.append("td").text(function(penguin)
        {
            return penguin.final[0].grade
            //study syntax for lines 37/39
        });
    
    //create new column of first quiz grade for each penguin
    rows.append("td").text(function(penguin)
        {
        return penguin.quizes[0].grade
    })
    
    addCol(rows,function(penguin)
    {
        return penguin.quizes[0].grade
    })
    
     addCol(rows,function(penguin)
    {
        return penguin.final[0].grade
    })
}
//We want this addCol to be its own function and automate what we did from 37-47
//When building function like this, try leaving the inside of "function()" blank and figure it out as we move forward
//We add "rows" as parameter because it doesn't know what the hell rows is otherwise
var addCol=function(rows, fcn)
    {
       rows.append("td").text(fcn)
    
    }

//To add text to next column, a function is needed.
    //Make functions when you realize you're doing too much work (maybe copy/paste a lot, etc.)
    //at its core, d3 is taking the data and creating something with html to match up
 