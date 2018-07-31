
var express = require('express');

var router = express.Router();


router.get('/:id/:name',function(req,res){
	
	res.send("inside get router"+req.params.id+'==='+req.params.name);
});

var test = function(key1){
	
	console.log("========= in test function====");
}

module.exports = router;