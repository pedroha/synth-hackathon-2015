$(function () {

    var values = [17, 25, 25, 25],
        labels = ["Frequency", "Amplitude", "Loudness", "No clue"];

    var pies = Raphael("holder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");

    pies[0].onValueChange = function(value) {
        console.log("0", value);
    };

    pies[2].onValueChange = function(value) {
        console.log("1", value);
    };

    pies[4].onValueChange = function(value) {
        console.log("2", value);
    };

    console.log("Pies: " + pies.length);

});
