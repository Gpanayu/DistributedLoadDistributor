var url = require('url');
var http = require('http');
var axios = require('axios');

http.createServer(function(req, res){
  var reqUrl = req.url.substr(1);
  axios.get('http://localhost:1111/healthcheck').then(function(data){
    if(data.data.uptime){
      console.log("in 1 na");
      reqUrl = "http://localhost:1111/"+reqUrl;
      req.pause();
      var options = url.parse(reqUrl);
      options.headers = req.headers;
      options.method = req.method;
      options.agent = false;
      options.headers['host'] = options.host;
      var connector = http.request(options, function(serverResponse) {
        serverResponse.pause();
        serverResponse.headers['access-control-allow-origin'] = '*';
        res.writeHeader(serverResponse.statusCode, serverResponse.headers);
        serverResponse.pipe(res, {end:true});
        serverResponse.resume();
      });
      connector.on('error', function(err){
        console.log(err);
      });
      req.pipe(connector, {end:true});
      req.resume();
    }
    else{
      console.log("in 2 na");
      reqUrl = "http://localhost:1112/"+reqUrl;
      req.pause();
      var options = url.parse(reqUrl);
      options.headers = req.headers;
      options.method = req.method;
      options.agent = false;
      options.headers['host'] = options.host;
      var connector = http.request(options, function(serverResponse) {
        serverResponse.pause();
        serverResponse.headers['access-control-allow-origin'] = '*';
        res.writeHeader(serverResponse.statusCode, serverResponse.headers);
        serverResponse.pipe(res, {end:true});
        serverResponse.resume();
      });
      connector.on('error', function(err){
        console.log(err);
      });
      req.pipe(connector, {end:true});
      req.resume();
    }
  }).catch(function(err){
    console.log("in 3 na");
    reqUrl = "http://localhost:1112/"+reqUrl;
    req.pause();
    var options = url.parse(reqUrl);
    options.headers = req.headers;
    options.method = req.method;
    options.agent = false;
    options.headers['host'] = options.host;
    var connector = http.request(options, function(serverResponse) {
      serverResponse.pause();
      serverResponse.headers['access-control-allow-origin'] = '*';
      res.writeHeader(serverResponse.statusCode, serverResponse.headers);
      serverResponse.pipe(res, {end:true});
      serverResponse.resume();
    });
    connector.on('error', function(err){
      console.log(err);
    });
    req.pipe(connector, {end:true});
    req.resume();
  });
}).listen(1110);

console.log("The server is running at port 1110");