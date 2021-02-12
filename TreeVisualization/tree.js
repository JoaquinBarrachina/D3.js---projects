

const svg = d3.select('svg');

const width = document.body.clientWidth;
const height = document.body.clientHeight;
svg
    .attr('width',width)
    .attr('height',height)

//init tree
const treeLayout = d3.tree()
                .size([height,width]);


    


d3.json('./data.json').then(data=>{
    
    console.log(data)

    const root =d3.hierarchy(data);
    const links = treeLayout(root).links();

    const linkPathGenerator = d3.linkHorizontal()
                                .x(d=> d.y)
                                .y(d=>d.x)

    svg.selectAll('path').data(links)
        .enter().append('path')
        .attr('d',linkPathGenerator)

})