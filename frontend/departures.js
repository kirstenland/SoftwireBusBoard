function getData(postcode) {
    $.ajax({url: "/departureBoards/"+postcode,
            success: renderData,
            error: renderError});
}

function renderData(data) {
    $("#errors").hide();
    var resultsDiv = $("#results").show();
    var header = $("<h2>").text("Results:")
    var stops = data.map(renderStop);
    resultsDiv.html(header).append(stops);
}

function renderStop(stop) {
    var subheader =$("<h3>").text(stop.commonName)
    var list =$("<ul>")
    for (var i = 0; i < stop.buses.length; ++i) {
        var bus = stop.buses[i];
        var label = bus.lineName + " to " + bus.destinationName + " arriving in " + renderTimeToBus(bus.timeToStation);
        list.append($("<li>").text(label))
    }
    return $("<spand>").append(subheader).append(list);
}

function renderTimeToBus(time) {
    if (time > 60) {
        return (time/60).toFixed(0) + " minutes";
    } else {
        return time + " seconds";
    }
}

function renderError(xhr) {
    var errorBox = $("#errors");
    errorBox.show();
    errorBox.html(xhr.responseText);
    $("#results").hide();
}

function retriveStoredPostcode() {
    var storedValue = window.localStorage.getItem("postcode")  || "NW5 1TL";
    $("#postcode").val(storedValue);
}

function storePostcode() {
    window.localStorage.setItem("postcode", $("#postcode").val());
}

$().ready(function() {
    retriveStoredPostcode();
    $("#postcode_form").submit(function(event) {
        storePostcode();
        getData($("#postcode").val())
        event.preventDefault();
    });
    getData($("#postcode").val());
})
