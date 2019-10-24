//I would like to create 2 columns of a table: the first displays the image of each penguin, the second displays the final score

var appPromise = d3.json("penguins/classData.json");
appPromise.then(
    function(penguins)
        {
          makeTable(penguins); 
          getGrade(penguins);
          getQuizMean(penguins);
        }) 
//brings my data in, and calls the function to draw the table.


//This function draws my table
var makeTable = function(penguins)
{
    //d3.select("#mainTable").remove();
     var rows = d3.select("#mainTable")
    .selectAll("tr")
    .data(penguins)
    .enter()
    .append("tr");
    
    //this adds a column of images of penguins 
    rows.append("td")
        .append("img")
        .attr("src",function(d)
        {
            return "penguins/" + d.picture;
        //look at why "penguins" etc.
        });

    //These addCol functions are self-designed (not from the language), and take functions as inputs to basically automate the table generating process 
    addCol(rows,function(penguin)
    {
        return penguin.final[0].grade;
    })
    
    addCol(rows,function(penguin)
    {
        return getQuizMean(penguins);
    }) 
     
}
//We want this addCol to be its own function and automate what we did from 37-47
//When building function like this, try leaving the inside of "function()" blank and figure it out as we move forward
//We add "rows" as parameter because it doesn't know what the hell rows is otherwise
var addCol=function(rows, fcn)
    {
       rows.append("td").text(fcn)
    
    }

//These functions calculate the means and other stuff used below as inputs
 var getGrade = function(penguins)
 {
    return penguins.quizes.grade;
 }

var getQuizMean = function(penguin)
    {
        return d3.mean(penguin.quizes,getGrade);
    }

//use this function addCol we created because it tells me what's going on, feels more intuitive, helps me remember; also, if our initial function had a small mistake and I copy/paste it a million times I have all those mistakes, just like adding CSS to everything is easier here too. REMEMBER: function can be packed up and used as a parameter; 

//To add text to next column, a function is needed.
    //Make functions when you realize you're doing too much work (maybe copy/paste a lot, etc.)
    //at its core, d3 is taking the data and creating something with html to match up
 
  /* rows.append("td").text(function(penguin)
        {
            return penguin.final[0].grade
            //study syntax for lines 37/39
        });
    
    //create new column of first quiz grade for each penguin
    rows.append("td").text(function(penguin)
        {
        return penguin.quizes[0].grade
    })*/
