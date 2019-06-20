import * as d3 from 'd3';
import _ from 'lodash';

export function clearChart() {
    var myNode = document.getElementById('zoomchart');

    d3.select('.pg-trading-ui-container').style('display', 'none');
    if (myNode) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }
}

export function drawChart(prices) {
    var myNode = document.getElementById('zoomchart');
    if (!prices.length) {
        window.console.log(prices);
        return 0;
    }

    if (myNode) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    const months = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec',
    };

    const dateFormat = d3.timeParse('%Y-%m-%d %H:%M');

    const handleFormatTime = date => {
        return new Date(date).getHours() + ':' + (new Date(date).getMinutes() < 10 ? '0' + new Date(date).getMinutes() : new Date(date).getMinutes());
    }

    for (const price of prices) {
        const date = new Date(price['date']);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        price['date'] = dateFormat(`${year}-${month}-${day} ${hours}:${minutes}`);
    }

    const margin = {
        top: 15,
        right: 65,
        bottom: 105,
        left: 10,
    };

    const w = document.getElementsByClassName('react-grid-item')[2].clientWidth - margin.left - margin.right;
    const h = document.getElementsByClassName('react-grid-item')[2].clientHeight - margin.top - 160;

    d3.select('.pg-trading-ui-container').style('display', 'block').style('height', '85%');
    let svg = d3
        .select('#zoomchart')
        .attr('width', w + margin.right)
        .attr('height', h + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const dates = _.map(prices, 'date');
    const xmin = d3.min(prices.map(r => new Date(r.date).getTime()));
    const xmax = d3.max(prices.map(r => new Date(r.date).getTime()));
    const xScale = d3
        .scaleLinear()
        .domain([-1, dates.length])
        .range([0, w]);
    const xDateScale = d3
        .scaleQuantize()
        .domain([0, dates.length])
        .range(dates);
    const xBand = d3
        .scaleBand()
        .domain(d3.range(-1, dates.length))
        .range([0, w])
        .padding(0.3);
    const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickFormat(function(d) {
            d = dates[d];
            return handleFormatTime(d);
        });

    svg.append('rect')
        .attr('id', 'rect')
        .attr('width', w)
        .attr('height', h)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('clip-path', 'url(#clip)');

    const gX = svg
        .append('g')
        .attr('class', 'axis x-axis')
        .attr('transform', 'translate(0,' + h + ')')
        .call(xAxis);

    gX.selectAll('.tick text').call(wrap, xBand.bandwidth());

    const ymin = d3.min(prices.map(r => r.low));
    const ymax = d3.max(prices.map(r => r.high));

    const yScale = d3
        .scaleLinear()
        .domain([ymin, ymax])
        .range([h, 0]);
    const yAxis = d3.axisRight().scale(yScale);
    const yScaleToPrice = d3
        .scaleLinear()
        .domain([h, 0])
        .range([ymin, ymax]);
    const gY = svg
        .append('g')
        .attr('class', 'axis y-axis')
        .attr('transform', 'translate(' + w + ',0)')
        .call(yAxis);

    const chartBody = svg
        .append('g')
        .attr('class', 'chartBody')
        .attr('clip-path', 'url(#clip)');

    const candles = chartBody
        .selectAll('.candle')
        .data(prices)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i) - xBand.bandwidth())
        .attr('class', 'candle')
        .attr('rx', 3)
        .attr('y', d => yScale(Math.max(d.open, d.close)))
        .attr('width', xBand.bandwidth())
        .attr('height', d => (d.open === d.close ? 1 : yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close))))
        .attr('fill', d => (d.open === d.close ? 'silver' : d.open > d.close ? '#D15256' : '#05AA81'));

    const stems = chartBody
        .selectAll('g.line')
        .data(prices)
        .enter()
        .append('line')
        .attr('class', 'stem')
        .attr('x1', (d, i) => xScale(i) - xBand.bandwidth() / 2)
        .attr('x2', (d, i) => xScale(i) - xBand.bandwidth() / 2)
        .attr('y1', d => yScale(d.high))
        .attr('y2', d => yScale(d.low))
        .attr('stroke', d => (d.open === d.close ? 'white' : d.open > d.close ? '#D15256' : '#05AA81'));

    svg.append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('width', w)
        .attr('height', h);

    const extent = [[0, 0], [w, h]];

    let resizeTimer;
    const zoom = d3
        .zoom()
        .scaleExtent([1, 100])
        .translateExtent(extent)
        .extent(extent)
        .on('zoom', zoomed)
        .on('zoom.end', zoomend);

    svg.call(zoom);

    const middle = ymin + (ymax - ymin) / 2;

    var price = middle;
    var totalPrice = 0;
    var amount = 0;

    const orderForm = d3.select('#form');
    const priceIndic = d3.select('.pg-trading-order-price-indicator');

    const line = svg
        .append('line')
        .attr('class', 'mean-line')
        .attr('x1', 0)
        .attr('y1', yScale(middle))
        .attr('x2', w)
        .attr('y2', yScale(middle))
        .attr('stroke', '#05AA81')
        .style('stroke-dasharray', '5')
        .attr('stroke-width', 1)
        .style('cursor', 'ns-resize')
        .call(d3.drag().on('drag', dragged));

    orderForm
        .style('top', yScale(middle) - 15 + 'px').style('right', '100px')
        .call(d3.drag().on('drag', dragged));
    priceIndic
        .style('top', yScale(middle) + 100 + 'px')
        .style('right', '10px')
        .style('cursor', 'ns-resize')
        .call(d3.drag().on('drag', dragged));
    d3.select('#price-indicator').text(middle.toFixed(2));


    d3.select('.pg-trading-order-item__input-amount input').on('input', inputChange);

    function inputChange() {
        totalPrice = (price * this.value).toFixed(8);
        d3.select('.pg-trading-order-item__input-total-price input')
            .attr('value', totalPrice)
            .attr('placeholder', totalPrice);
    }

    function updateLine(y) {
        line.attr('y1', y).attr('y2', y);
    }

    function updatePrice(y) {
        priceIndic.style('top', y + 96 + 'px').style('right', '10px');
        d3.select('#price-indicator').text(yScaleToPrice(y).toFixed(2));
    }

    function dragged(d) {
        if (yScaleToPrice(d3.event.y) <= ymax && yScaleToPrice(d3.event.y) >= ymin) {
            const currentPositionY = d3.event.y + (line.attr('y1') - d3.event.y ) / 1.5;
            updateLine(currentPositionY);
            updatePrice(currentPositionY);
            orderForm.style('top', currentPositionY - 19 + 'px').style('right', '100px');
            amount = parseFloat(d3.select('.pg-trading-order-item__input-amount input').attr('value'));
            totalPrice = (yScaleToPrice(currentPositionY) * amount).toFixed(8);
            price = yScaleToPrice(currentPositionY);
            d3.select('.pg-trading-order-item__input-total-price input')
                .attr('value', totalPrice)
                .attr('placeholder', totalPrice);
        }
    }

    function zoomed() {
        const t = d3.event.transform;
        const xScaleZ = t.rescaleX(xScale);

        const hideTicksWithoutLabel = function() {
            d3.selectAll('.xAxis .tick text').each(function(d) {
                if (this.innerHTML === '') {
                    this.parentNode.style.display = 'none';
                }
            });
        };

        gX.call(
            d3.axisBottom(xScaleZ).tickFormat((d, e, target) => {
                if (d >= 0 && d <= dates.length - 1) {
                    d = dates[d];
                    return handleFormatTime(d);
                }
            })
        );

        candles.attr('x', (d, i) => xScaleZ(i) - (xBand.bandwidth() * t.k) / 2).attr('width', xBand.bandwidth() * t.k);
        stems.attr('x1', (d, i) => xScaleZ(i) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5);
        stems.attr('x2', (d, i) => xScaleZ(i) - xBand.bandwidth() / 2 + xBand.bandwidth() * 0.5);

        hideTicksWithoutLabel();

        gX.selectAll('.tick text').call(wrap, xBand.bandwidth());
    }

    function zoomend() {
        const t = d3.event.transform;
        const xScaleZ = t.rescaleX(xScale);
        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function() {
            const xmin = new Date(xDateScale(Math.floor(xScaleZ.domain()[0]))),
                xmax = new Date(xDateScale(Math.floor(xScaleZ.domain()[1]))),
                filtered = _.filter(prices, d => d.date >= xmin && d.date <= xmax),
                minP = +d3.min(filtered, d => d.low),
                maxP = +d3.max(filtered, d => d.high),
                buffer = Math.floor((maxP - minP) * 0.1);

            yScale.domain([minP - buffer, maxP + buffer]);
            candles
                .transition()
                .duration(800)
                .attr('y', d => yScale(Math.max(d.open, d.close)))
                .attr('height', d =>
                    d.open === d.close ? 1 : yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close))
                );

            stems
                .transition()
                .duration(800)
                .attr('y1', d => yScale(d.high))
                .attr('y2', d => yScale(d.low));

            gY.transition()
                .duration(800)
                .call(d3.axisRight().scale(yScale));
        }, 500);
    }
}

function wrap(text, width) {
    text.each(function() {
        let text = d3.select(this),
            words = text
                .text()
                .split(/\s+/)
                .reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            y = text.attr('y'),
            dy = parseFloat(text.attr('dy')),
            tspan = text
                .text(null)
                .append('tspan')
                .attr('x', 0)
                .attr('y', y)
                .attr('dy', dy + 'em');

        while ((word = words.pop())) {
            if (word !== 'NaN:NaNpm' && word !== 'NaN:NaNPM' && word !== 'NaN' && word !== 'undefined' && word !== 'NaN:NaN') {
                line.push(word);
                tspan.text(line.join(' '));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(' '));
                    line = [word];
                    tspan = text
                        .append('tspan')
                        .attr('x', 0)
                        .attr('y', y)
                        .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                        .text(word);
                }
            }
        }
    });
}



// WEBPACK FOOTER //
// ./src/custom/containers/ZoomTradingChart/getChart.js