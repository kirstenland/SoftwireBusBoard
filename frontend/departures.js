var state = {
    postcode: ""
}


function getData(postcode) {
    spinner.show();
    $.ajax({url: "/departureBoards/"+postcode,
            success: renderData,
            error: renderError});
}

function renderData(data) {
    spinner.hide();
    $("#errors").hide();
    var resultsDiv = $("#results").show();
    var header = $("<h2>").text("Results:")
    var stops = data.map(renderStop);
    resultsDiv.html(header).append(stops);
}

function renderStop(stop) {
    var subheader =$("<h3>").text(stop.commonName)
    var list =$("<ul>").addClass("fa-ul");
    for (var i = 0; i < stop.buses.length; ++i) {
        var bus = stop.buses[i];
        var busIcon =$("<span>")
            .addClass("fa-li")
            .append($("<i>")
            .addClass(["fas", "fa-bus-alt"]));
        var label = "<span class=\"bus\">" + bus.lineName + "</span>"
            + " to " + bus.destinationName
            + " arriving in " + renderTimeToBus(bus.timeToStation);
        list.append($("<li>").append(busIcon).append(label))
    }
    return $("<span>").append(subheader).append(list);
}

function renderTimeToBus(time) {
    if (time > 60) {
        return (time/60).toFixed(0) + " minutes";
    } else {
        return time + " seconds";
    }
}

function renderError(xhr) {
    spinner.hide();
    var errorBox = $("#errors");
    errorBox.show();
    errorBox.html(xhr.responseText);
    $("#results").hide();
}

function loadState() {
    state.postcode = window.localStorage.getItem("postcode")  || "NW5 1TL";
    $("#postcode").val(state.postcode);
}

function updateState() {
    state.postcode = $("#postcode").val();
}

function storeState() {
    window.localStorage.setItem("postcode", state.postcode);
}

var spinner = {
    show: function() {
        $("#spinner").show();
    },
    hide: function() {
        $("#spinner").hide();
    }
}


$().ready(function() {
    loadState();
    $("#postcode_form").submit(function(event) {
        updateState();
        storeState();
        getData(state.postcode);
    });
    setInterval(function() {getData(state.postcode)}, 30*1000);
    getData(state.postcode);
})
