var selectedStationId;

function getTrains() {
        //clear results
        document.getElementById('list').innerHTML = "<ul data-role='listview' id='trainlist'></ul>";
    
        var params = {
            // Request parameters
        };
      
        $.ajax({
            url: "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/" + selectedStationId + "?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key",key);
            },
            complete: function() {
              //  $('#trainlist').listview().listview('refresh');
            }, 
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
            var length = data.Trains.length;
            var location = data.Trains[0].LocationName;
            document.getElementById('station').innerHTML = "<p id='loc'>" + location + "</p>";
            var table;
            list = ""
            for(var x = 0; x < length; x++)
                {
                    var dest = data.Trains[x].DestinationName;
                    var line = data.Trains[x].Line;
                    var minutes = data.Trains[x].Min;
                    var out = trainOut(dest, line, minutes);
                    list += out;
                }
            console.log(list);
            document.getElementById('trainlist').innerHTML += list;
            $('#trainlist').listview().listview('refresh');
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
         
        var out;
        if (backgroundColor != "blue"){
            out = "<li style='background-color:" + backgroundColor + "'><h2>" + dest + "</h2><h4>Status: " + minutes + " minutes</h4></li>";
        } else
        {
             out = "<li style='background-color:" + backgroundColor + "; color: white;'><h2>" + dest + "</h2><h4>Status: " + minutes + " minutes</h4></li>";
        }
        return out;
    }


function getStations() {
        var params = {
            // Request parameters
            "LineCode": "BL",
        };
      
        $.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("api_key",key);
            },
            type: "GET",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            console.log(data);
            var stationList = new Array();
            console.log("Length: " + data.Stations.length);
            for(var x =0; x < data.Stations.length; x++)
                {
                    console.log(x);
                    var name = data.Stations[x].Name;
                    var id = data.Stations[x].Code;
                    var thisStation = new Station(name, id);
                    stationList.push(thisStation);
                }
            for (var x=0; x < stationList.length; x++)
                {
                    var out = "<option value='" + stationList[x].stationId + "'>";
                    out+= stationList[x].stationName;
                    out+= "</option>";
                    document.getElementById('stationListSelector').innerHTML += out;
                }
        })
        .fail(function() {
            alert("error");
        });
    }

function stationChanged()
{
    selectedStationId = document.getElementById('stationListSelector').value;
    console.log(selectedStationId);
}