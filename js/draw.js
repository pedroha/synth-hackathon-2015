$(function () {

    var values = [33, 33, 33],
        labels = ["Frequency", "Amplitude", "Loudness"];

    Raphael("holder", 700, 700).pieChart(350, 350, 200, values, labels, "#fff");
});
