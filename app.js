//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const https =require('https');
const { dir } = require('console');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req,res)
{
    const firstName = req.body.FName;
    const lastName =req.body.LName;
    const email =req.body.email;
    const data ={
        members:[
            {
                email_address :email,
                status : "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
   const jsonData= JSON.stringify(data);
   const url ="https://us18.api.mailchimp.com/3.0/lists/2799efa151?fields=name";
   const options ={
       method: "POST",
       auth: "prerna00:b21670e66c645538b5e2ba5f97885a15-us18"
   };
   const request = https.request(url, options, function(response)
   {
       if(response.statusCode===200)
       {
           res.sendFile(__dirname+"/success.html");
       }
       else
       {
           res.sendFile(__dirname+"/failure.html");
       }
   response.on("data",function(data)
   {
     console.log(JSON.parse(data));
   })
   })
   request.write(jsonData);
   request.end();
});
app.post("/failure",function(req,res)
{
    res.redirect("/");
});
app.listen(process.env.PORT || 3000, function()
{
    console.log("Server has been started on 3000 port");
});

// api key
// b21670e66c645538b5e2ba5f97885a15-us18

// unique Id
// 2799efa151