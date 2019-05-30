function getStations() {
        var params = {
            // Request parameters
            "LineCode": "BL",
        };
      
        $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key","6b700f7ea9db408e9745c207da7ca827");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
        })
        .fail(function() {
            alert("error");
        });
    }

function getTrains() {
        var params = {
            // Request parameters
        };
      
        $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/C03?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key","6b700f7ea9db408e9745c207da7ca827");
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
            var length = data.Trains.length;
            var location = data.Trains[0].LocationName;
            document.getElementById('result').innerHTML = "<p id='loc'>" + location + "</p>";
            var table;
            table = "<table>";
            for(var x = 0; x < length; x++)
                {
                    var dest = data.Trains[x].DestinationName;
                    var line = data.Trains[x].Line;
                    var minutes = data.Trains[x].Min;
                    var out = trainOut(dest, line, minutes);
                    table += out;
                }
            table += "</table>";
            document.getElementById('result').innerHTML += table;
            
        })
        .fail(function() {
            alert("error");
        });
    }
    
    function trainOut(dest, line, minutes)
    {
        var backgroundColor;
        switch(line)
            {
                case "RD":
                    backgroundColor = "red";
                    break;
                case "YL":
                    backgroundColor = "yellow";
                    break;
                case "GR":
                    backgroundColor = "green";
                    break;
                case "BL":
                    backgroundColor = "blue";
                    break;
                case "OR":
                    backgroundColor = "orange";
                    break;
                case "SV":
                    backgroundColor = "silver";
            }
         out = "<tr style='background-color:" + backgroundColor + "'><td>" + dest + "</td><td>" + minutes + "</td></tr>";
        return out;
    }
