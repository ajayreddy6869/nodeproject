console.log("=================inside myproject=="+process.env.NODE_ENV);

var express = require('express');
var app = express();



app.get('/', function(req,res,next){
  console.log('inside router geSt call');

  return res.send('<h2>layout</h2>');	
 
});

app.set('port',process.env.PORT || '4000');
app.listen(app.get('port'),function(){
	
	console.log("========port 4000 listened =");
	
});


