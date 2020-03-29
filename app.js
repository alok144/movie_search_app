var express=require("express");
var app=express();

var request=require("request");

app.use(express.static("public"));

var port=process.env.PORT||8080;

app.listen(port, function(){
    console.log("movie app started!!");
});

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("search");
});

app.get("/results",function(req,res){
    //res.send("it works!");
    //getting data from form that sending data to this route
    var moviekey=req.query.moviekey;
    var url="http://www.omdbapi.com/?apikey=thewdb&s="+moviekey;
    request(url, function(error, response, body){
        if(!error&&response.statusCode==200)
        {
            var data=JSON.parse(body);
            //res.send(results["Search"][0]["Title"]);
            res.render("results",{data:data});
        }
    });
});