
const svg =  d3.select('svg');
const height = svg.attr('height');
const width = svg.attr('width');

//to adjust barchart inside element with margin
const margin = {top:50,right:20,left:100,bottom:20};
const innerHeight = height-margin.top-margin.bottom;
const innerWidth = width-margin.left-margin.right;

//render data

const render = (data) => {

    
    //set x scale
    const xScale = d3.scaleLinear()
                     .domain([0,d3.max(data, dataElement=> dataElement.population)])
                     .range([0,innerWidth]);

    
    //set y scale
    const yScale = d3.scaleBand() 
                      .domain(data.map(d=>d.country))
                      .range([0,innerHeight])
                      .padding(0.1);    //add space between bars

    //set y axis                  
    const yAxis = d3.axisLeft(yScale);
           
    
    //set group inside svg
    const g = svg.append('g')
                .attr('transform',`translate(${margin.left},${margin.top})`)


 //FORMATTING               
    //Generating format for xAxis label (converting number in special string)
    const xAxisTickFormat = number =>d3.format('.3s')(number)
                                        .replace('G','B')



    //X-axis formatted text
    const xAxis =d3.axisBottom(xScale)
            .tickFormat(xAxisTickFormat)
            .tickSize(-innerHeight)  //make ticks lines longer to look like grid



    //link the axis to a new group inside the group            
    g.append('g').call(yAxis);
    g.append('g').call(xAxis)
        .attr('id','xAxis')
        .attr('transform',`translate(0,${innerHeight})`)
    
    //display data with the applied scale
    g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('y', d=>yScale(d.country))
        .attr('height',yScale.bandwidth())
        .attr('width', d=> xScale(d.population))
        .attr('fill','blue')
        .attr('opacity',0.7)

    d3.selectAll('text').style('font-size','15px').attr('transform','rotate(-25)');

    
    //DELETING TICK LINES FROM AXIS, the selectors have been chosen inspecting the rendered DOM

    g.selectAll('.domain').remove();                //delete both main lines
    g.select('g').selectAll('.tick line').remove()  //delete tick lines just in first g (yaxis)


    //ADDING A TITLE
    g.append('text')
     .text('Top Populated Countries')
      .attr('font-size','35px')
      .attr('x',130)
      .attr('y',-20)
      .attr('font-family','monospace');

    
    //ADDING VISUALIZATION TITLES
    g.select('#xAxis')
        .append('text')
        .text('Population')
        .attr('fill','#000')
        .attr('font-size',16)
        .attr('font-weight','700')
        .attr('x',-63)
        .attr('y',19)
        .attr('transform','rotate(25)');

    
    //CHANGE LABEL COLORS
        g.selectAll('.tick text')
            .attr('fill','#635f5d');
    
    //CHANGE LINES COLORS
        g.selectAll('.tick line')
            .attr('stroke','#C0C0BB')
    
}





//Import CSV Data
d3.csv('data.csv').then(res=>{
    var dataProcessed = res.map(entry =>({
        ...entry,
        population:parseInt(entry.population)*1000
    }));
    console.log(dataProcessed);

    render(dataProcessed);
})