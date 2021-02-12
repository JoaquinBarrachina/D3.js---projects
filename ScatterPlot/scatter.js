
const data = [
    {height:180, weight:80},
    {height:158, weight:75},
    {height:165, weight:83},
    {height:178, weight:77},
    {height:200, weight:160},
    {height:189, weight:120},
    {height:168, weight:63},
    {height:182, weight:85},
    {height:130, weight:50},
    {height:170, weight:60},
    {height:160, weight:90},
    {height:100, weight:85},
];


const svg = d3.select('svg');

const width = svg.attr('width');
const height = svg.attr('height');
const padding = 50;
const innerH = height-2*padding;
const innerW = width-2*padding;


//Building Scale (X for Height)
const xScale = d3.scaleLinear()
                    .domain([d3.min(data,d=>d.height)-20, d3.max(data,d=>d.height)+20])
                    .range([0,innerW])
                    

//Building scale (Y for Weight)
const yScale = d3.scaleLinear()
                    .domain([ d3.max(data,d=>d.weight)+10, d3.min(data,d=>d.weight)-10 ])
                    .range([0,innerH])
                    

//Create super group
const mainG = svg.append('g').attr('transform',`translate(${padding/2},${padding})`);


//Create Axis X with the X scale
const gX = mainG.append('g')
    .attr('id','xAxis')
    .call(d3.axisBottom(xScale)).attr('transform',`translate(${padding},${innerH})`);


//Create Axis Y with the Y scale
const gY=mainG.append('g')
    .attr('id','yAxis')
    .call(d3.axisLeft(yScale)).attr('transform',`translate(${padding},0)`);


//format grid    
d3.select('#xAxis').selectAll('line').attr('y2',-innerH).attr('stroke','silver');
d3.select('#xAxis').select('.domain').attr('stroke-width',4)
d3.select('#yAxis').selectAll('line').attr('x2',innerW).attr('stroke','silver');
d3.select('#yAxis').select('.domain').attr('stroke-width',4)


//ADD CIRCLES
mainG.selectAll('circles')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx',(d)=>xScale(d.height) + padding)
    .attr('cy',(d)=> yScale(d.weight))
    .attr('r',30)
    .attr('opacity',0.5)
    .attr('title',(d)=>`${d.height},${d.weight}`)

    
//Format axis text -> also look documentation for .format()
gX.selectAll('text').attr('fill','blue').attr('font-size',14).attr('font-weight',800)
gY.selectAll('text').attr('fill','blue').attr('font-size',14).attr('font-weight',800)

//ADD labels
const xLabel = gX.append('text')
    .text('Height [cm]')
    .attr('fill','#000').attr('font-size',25)
    .attr('x',350)
    .attr('y',45)

const yLabel = gY.append('text')
                .text('Weight [Kg]')
                .attr('fill','#000')
                .attr('font-size',25)
                .attr('x',-350)
                .attr('y',-45)
                .attr('transform','rotate(-90)')



    
