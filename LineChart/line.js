//LOADING DATA

d3.csv('https://vizhub.com/curran/datasets/temperature-in-san-francisco.csv')
.then(data => {
    const dataProc = data.map(item=>({

        timestamp: new Date(item.timestamp),
        temperature:parseFloat(item.temperature)

    }));
    
    buildLineChart(dataProc);
});


const buildLineChart = data =>{
    
    const svg = d3.select('svg');

    const width = svg.attr('width');
    const height = svg.attr('height');
    const padding=30;
    const innerH = height - 2*padding;
    const innerW = width - 2*padding;

    const xScale = d3.scaleTime()
                        .domain(d3.extent(data, d=> d.timestamp)) //with extent we dont need min and max, it takes the limit values of dataset
                        .range([0,innerW]);

    const yScale = d3.scaleLinear()
                        //.domain(d3.extent(data,d=> d.temperature))
                        .domain([0,d3.max(data,d=>d.temperature)])
                        .range([innerH,0]).nice();

    console.log(yScale.domain())
    const mainG = svg.append('g');
    mainG.attr('transform','translate(0,10)')

    
    const gX = mainG.append('g')
                    .call(d3.axisBottom(xScale))
                    .attr('transform',`translate(${padding},${innerH})`);
    
    const gY = mainG.append('g')
                    .call(d3.axisLeft(yScale))
                    .attr('transform',`translate(${padding},0)`);

    
    mainG.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('r',0)
        .attr('opacity',0.5)
        .attr('fill','green')
        .attr('cx',(d)=>xScale(d.timestamp)+padding)
        .attr('cy',d=>yScale(d.temperature))
        .transition()
        .duration(1000)
        .delay(200)
            .attr('r',10)

    //////////////////////////////////////////
    //////////CORE Generate the line --uncomment and comment AREA GENERATOR BELOW
    /////////////////////////////////////


    // const lineGenerator = d3.line()
    //                         .x(d=>xScale(d.timestamp)+padding)
    //                         .y(d=>yScale(d.temperature))
    // mainG.append('path')
    //     .attr('d',lineGenerator(data))
    //     .attr('fill','none')
    //     .attr('stroke','black')
    //     .attr('stroke-width',3)
    //     .attr('stroke-linejoin','round')


    
    //////////////////////////////////////////
    ///////////////////CORE Generate Area
    ////////////////////////////////////

    const areaGenerator = d3.area()
                            .x(d=>xScale(d.timestamp)+padding)
                            .y0(innerH)
                            .y1(d=>yScale(d.temperature))

    mainG.append('path')
        .attr('d',areaGenerator(data))
        .attr('opacity',0.5)
        
        





    //delete 12PM from scale time
    gX.selectAll('text')
        .data(data)
        .attr('fill',(d,i)=>{
            return i%2==0 ? 'red':'none';
        })
        .attr('font-weight',900)

}