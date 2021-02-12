//Globals

//d3
//topojson


const svg = d3.select('svg');
const h = svg.attr('height');
const w = svg.attr('width');

//Here is picked the kind of map to be displayed, check d3 docs (d3-geo) ex: .geoAzimuthalEquidistant()
const projection = d3.geoNaturalEarth1();
const pathGenerator = d3.geoPath().projection(projection);

//Create a main group to append things
const g = svg.append('g');

//This add the path that surrounds the globe
g.append('path')
    .attr('class','sphere')
    .attr('d',pathGenerator({type:"Sphere"}));
    


//Adding zoom to the svg which contain the map
const zoomed = ({transform}) =>{
    g.attr("transform",transform);
}
svg.call( d3.zoom().scaleExtent([1,40]).on("zoom",zoomed))



//add country data, using the url doesnt work, file downloaded
const tsvPromise = d3.tsv('110m.tsv');

//add map data, (just info of the paths for printing the map)
const jsonPromise = d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json');



//Take both promises results to the same scope
Promise.all([tsvPromise,jsonPromise])
.then(([tsvData,jsonData]) => {

    //create object relating id in json object with countries and info in tsv about the country
     
    const countryName = tsvData.reduce((accumulator,country,list)=>{

        accumulator[country.iso_n3] = country.name;
        return accumulator; 

    },{});

    console.log(countryName)
   

    //Take country data to plot world map
    const countries = topojson.feature(jsonData,jsonData.objects.countries);

        //Plot world map
        g.selectAll('path')
        .data(countries.features)
        .enter()
            .append('path')
            .attr('class','country')        //linked to css (hover,...)
            .attr('d', d => pathGenerator(d))
        .append('title')
            .text(d => countryName[d.id]) //take the name from the object created

});





