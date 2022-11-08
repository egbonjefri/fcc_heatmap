import {useRef,useEffect} from 'react'
import * as d3 from 'd3'
import dataset from './dataset'



function App() {
  const ref = useRef()
  const baseline = dataset.dataset.baseTemperature

  useEffect(()=> {
    var margin = {top: 20, right: 30, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;
    const parseTime = d3.timeParse('%Y')
    const monthNames = ['',"January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    const dates = [];
    var yAxis = d3.scaleLinear()
    .range([ 0, 180])
    .domain(['12','0'])
        // eslint-disable-next-line
    dataset.dataset.monthlyVariance.map((item)=>{dates.push(parseTime(item.year))})
    const domain = d3.extent(dates)
    var x = d3.scaleTime()
    .range([ 0, height +50])
    .domain(domain)

    var y = d3.scaleBand()
    .range([ 360, 0 ])
    .domain(dataset.dataset.monthlyVariance.map((item)=>{return monthNames[item.month]}))
    ;
    




    const svgElement = d3.select(ref.current);
    const tooltip = d3.select('body').append('div').attr('class','tooltip-style').style('opacity',0)

    svgElement.selectAll('rect')
    .data(dataset.dataset.monthlyVariance)
    .enter()
    .append("rect")
    .attr('x', d=> x(parseTime(d.year)))
    .attr('y', d=> (y(monthNames[d.month])-350))
    .attr('width', 2.45)
    .attr('height',30)
    .attr("fill", function(d){
      return (baseline+d.variance >= 12) ? '#641E16' : 
      (baseline+d.variance < 12 && baseline+d.variance >= 10) ? '#A93226' :
      (baseline+d.variance < 10 && baseline+d.variance >= 9) ? '#E74C3C' :
      (baseline+d.variance < 9 && baseline+d.variance >= 8) ? '#F57F17' :
      (baseline+d.variance < 8 && baseline+d.variance >= 7) ? '#F4D03F' :
      (baseline+d.variance < 7 && baseline+d.variance >= 6) ? '#D7BDE2' :
      (baseline+d.variance < 6 && baseline+d.variance >= 5) ? '#A9CCE3' :
      (baseline+d.variance < 5 && baseline+d.variance >= 4) ? '#2471A3' :
      (baseline+d.variance < 4 && baseline+d.variance >= 3) ? '#154360' :
      (baseline+d.variance < 3 && baseline+d.variance >= 2) ? '#7DCEA0' :
      (baseline+d.variance < 2 && baseline+d.variance >= 1) ? '#8BC34A' :

      '#196F3D'
    })
    .on('mouseenter', function(d,event){
      d3.select(this)
      .raise()
        .style('outline', 'solid 1px black')
        tooltip.style('opacity',1);
        tooltip.html(`${event.year} - ${monthNames[event.month]}<br> ${(baseline+event.variance).toFixed(2)}${'o'.sup()}C <br>${(event.variance).toFixed(2)}${'o'.sup()}C`)
        tooltip.style('left', (d.pageX-20)+'px')
        tooltip.style('top', ((d.pageY)-35)+'px')
      })
    .on('mouseleave', function(d,event){
      d3.select(this)
        .style('outline', 'none')
       tooltip.style('opacity', 0) 
    })
    svgElement.append("g")
    .call(d3.axisLeft(yAxis).ticks(12))
    .attr('transform', 'translate(760,-300)')
    svgElement.append("g")
    .call(d3.axisBottom(x))
    .attr('transform', 'translate(0,10)')
    svgElement.append("g")
    .call(d3.axisLeft(y))
    .attr('transform', 'translate(-1,-350)')
    svgElement.append('rect').attr('x',762).attr('y',-300).attr('width',15).attr('height',15).style('fill','#641E16')
    svgElement.append('rect').attr('x',762).attr('y',-285).attr('width',15).attr('height',15).style('fill','#A93226')
    svgElement.append('rect').attr('x',762).attr('y',-270).attr('width',15).attr('height',15).style('fill','#E74C3C')
    svgElement.append('rect').attr('x',762).attr('y',-255).attr('width',15).attr('height',15).style('fill','#F57F17')
    svgElement.append('rect').attr('x',762).attr('y',-240).attr('width',15).attr('height',15).style('fill','#F4D03F')
    svgElement.append('rect').attr('x',762).attr('y',-225).attr('width',15).attr('height',15).style('fill','#D7BDE2')
    svgElement.append('rect').attr('x',762).attr('y',-210).attr('width',15).attr('height',15).style('fill','#A9CCE3')
    svgElement.append('rect').attr('x',762).attr('y',-195).attr('width',15).attr('height',15).style('fill','#2471A3')
    svgElement.append('rect').attr('x',762).attr('y',-180).attr('width',15).attr('height',15).style('fill','#154360')
    svgElement.append('rect').attr('x',762).attr('y',-165).attr('width',15).attr('height',15).style('fill','#7DCEA0')
    svgElement.append('rect').attr('x',762).attr('y',-150).attr('width',15).attr('height',15).style('fill','#8BC34A')
    svgElement.append('rect').attr('x',762).attr('y',-135).attr('width',15).attr('height',15).style('fill','#196F3D')

    svgElement.append('text')
    // eslint-disable-next-line
.attr('transform', 'translate(770'+' ,'+(-310)+
')')
.style('text-anchor', 'middle')
.html(`Temperatures (Degree Celsius)`)
.style('font',"8px sans-serif")
.attr('fill', 'gray')

svgElement.append('text')
// eslint-disable-next-line
.attr('transform', 'translate(350'+' ,'+(-420)+
')')
.style('text-anchor', 'middle')
.text('Global Monthly Surface Temperatures (1753 - 2015)')
.style('font',"26px sans-serif")
.attr('fill', 'gray')
svgElement.append('text')
// eslint-disable-next-line
.attr('transform', 'translate(350'+' ,'+(-400)+
')')
.style('text-anchor', 'middle')
.text('(Normalized to a basal temperature of 8.66 degrees celsius)')
.style('font',"italic 14px sans-serif")
.attr('fill', 'gray')
svgElement.append('text')
.attr('transform', 'translate('+(width)+' ,'+(90)+
')')
.style('text-anchor', 'middle')
.text('Created by @egbonjefri for freeCodeCamp')
.style('font',"10px sans-serif")
.attr('fill', 'gray')
// eslint-disable-next-line
  },[dataset])

  return (
    <div className="body">
      <svg ref={ref} 
    viewBox='-250 -450 1200 900'>
    </svg>
    </div>
  );
}

export default App;
