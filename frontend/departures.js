function getData(postcode) {
    $.get("/departureBoards/"+postcode, renderData);
}

function renderData(data) {
    var resultsDiv = $("#results");
    var header = $("<h2>").text("Results:")
    var stops = data.map(function(stop) {
        
        var subheader =$("<h3>").text(stop.commonName)
        var list =$("<ul>")
        for (var i = 0; i < stop.buses.length; ++i) {
            var bus = stop.buses[i];
            var label = bus.lineName + " to " + bus.destinationName + " arriving in " + (bus.timeToStation/60).toFixed(0) + " minutes";
            list.append($("<li>").text(label))
        }
        return $("<spand>").append(subheader).append(list);
    });
    resultsDiv.html(header).append(stops);
}

$().ready(function() {
    $("#submit").click(function() {
        getData($("#postcode").val())
    })
}
)