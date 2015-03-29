Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();

    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }

    var pies = [];

    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = Raphael.hsb(start, .50, 1),
                ms = 500,
                delta = 30,
                bcolor = Raphael.hsb(start, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3}),
                txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});

            p.mousedown(function() {
                this.locked = !this.locked;
            });

            p.mouseup(function() {
            });

            var tracker = function(event, x, y) {
                if (!this.locked) {
                    // console.log(this.attr('path'));
                    var path = this.attr('path');
                    var angle = path[2];

                    var max = Math.max( Math.abs(x-cx), Math.abs(y-cy));
                    angle[1] = cx - max;
                    angle[2] = cy - max;

                    var ratio = Math.max(0, Math.max(0, max/cx));
                    // console.log("Rad: " + ratio);

                    if (this.onValueChange) {
                        this.onValueChange({ratio: ratio});
                    }

                    this.attr('path', path);
                }
            };

            p.mousemove(tracker);
            p.mouseout(tracker);

            // p.mouseover(function () {
            //     p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
            //     txt.stop().animate({opacity: 1}, ms, "elastic");
            // });

            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

// Center is about: 350, 350
