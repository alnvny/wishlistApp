var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(process.env.PORT || 5000, function() {
    console.log('app is running at :' + process.env.PORT);
});