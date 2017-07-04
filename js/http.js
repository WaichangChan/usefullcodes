var select = require('soupselect').select,
    htmlparser = require("htmlparser"),
    http = require('http');
    // sys = require('sys');

// fetch some HTML...
// var http = require('http');
// var host = 'www.reddit.com';
// var client = http.createClient(80, host);
// var request = client.request('GET', '/',{'host': host});

//http://61.220.191.221:60011/marksix/history/2016?type=1

http.get({
    host: '61.220.191.221',
    path: '/marksix/history/2016?type=1',
    port:60011
}, function(response) {

    response.setEncoding('utf8');

    var body = '';

    response.on('data', function(d) {
      body += d;
    });

    response.on('end', function() {

        

      var handler = new htmlparser.DefaultHandler(function(err, dom) {
            if (err) {
                console.log(err);
            } else {

            	console.log('parse end');
            
                // soupselect happening here...
                select(dom, '.history_numbers tr')
                .forEach(function(tr){

                	var tdList = select(tr, 'td');

                	console.log( tdList[3].children[0].raw.trim() );

                    // console.log(td.text().trim());
                });

                // console.log( select(dom, '.history_numbers tr').length );
            
                // sys.puts("Top stories from reddit");
                // titles.forEach(function(title) {
                //     sys.puts("- " + title.children[0].raw + " [" + title.attribs.href + "]\n");
                // })
            }
        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(body);
    });
});


/*request.on('response', function (response) {
    response.setEncoding('utf8');

    var body = "";
    response.on('data', function (chunk) {
        body = body + chunk;
    });

    response.on('end', function() {
    
        // now we have the whole body, parse it and select the nodes we want...
        var handler = new htmlparser.DefaultHandler(function(err, dom) {
            if (err) {
                sys.debug("Error: " + err);
            } else {
            
                // soupselect happening here...
                var titles = select(dom, 'a.title');
            
                sys.puts("Top stories from reddit");
                titles.forEach(function(title) {
                    sys.puts("- " + title.children[0].raw + " [" + title.attribs.href + "]\n");
                })
            }
        });

        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(body);
    });
});
request.end();*/