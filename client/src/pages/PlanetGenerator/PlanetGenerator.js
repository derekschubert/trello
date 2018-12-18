import React, { Component } from 'react';

export default class PlanetGenerator extends Component {
  static Create = () => {
    let radius = 70;
    let topLeft = [70, 70];
    let center = [topLeft[0] + radius, topLeft[1] + radius];

    // colors from background up
    let colors = ['#12364C', '#1B4660', '#386B84', '#3A8C99', '#56C1BE', '#9FE'];

    return (
      <g id='abc'>
        <ellipse fill={colors[0]} rx='70' ry='70' cx='140' cy='140' />
        <clipPath id='clip'>
          <ellipse rx='70' ry='70' cx='140' cy='140' />      
        </clipPath>
        <PlanetGenerator.Group clip='url(#clip)' 
          radius={radius} 
          color={colors[1]} 
          center={center} 
          fillPercentage={.9} 
        />
        <PlanetGenerator.Group clip='url(#clip)' 
          radius={radius} 
          color={colors[2]} 
          center={center} 
          fillPercentage={.75} 
        />
        <PlanetGenerator.Group clip='url(#clip)' 
          radius={radius} 
          color={colors[3]} 
          center={center} 
          fillPercentage={.6} 
        />
        <PlanetGenerator.Group clip='url(#clip)' 
          radius={radius} 
          color={colors[4]} 
          center={center} 
          fillPercentage={.45} 
        />
      </g>
    );
  }

  static Group = ({radius, center, fillPercentage, clip, color}) => {
    let lineWidth = 4;
    let lineCount = (radius * 2 / (lineWidth + 1)) + 1;
    let piSteps = Math.PI / lineCount;
    let xArr = [];
    let lines = [];
    
    // let randomEndVariance = 10;
    // let roughEndX = (center[0] + radius) * fillPercentage;

    // let roundingRadius = radius * fillPercentage;
    // let roundingCirc = 2 * Math.PI * roundingRadius;
    // let rs = radius * radius;

    for (let i = 0; i < lineCount / 2; i++) {
      xArr.push(radius * Math.cos(piSteps * i));
    }

    for (let i = -1; i < lineCount; i++) {
      let y = 72 + (i * 5);
      // let randomX;

      // if (i % 2 === 0) randomX = Math.floor(Math.random() * randomEndVariance);
      // else randomX = Math.floor(Math.random() * (-randomEndVariance));
      // else randomX = Math.floor(Math.random() * (randomEndVariance)) - randomEndVariance;

      // let endX = roughEndX + randomX;

      let endX;
      if (i < lineCount / 2) endX = xArr[i];
      else endX = xArr[i - (lineCount / 2)];

      endX += (center[0] - radius);

      // let endX = roughEndX;

      // let ys = (y) * (y);
      // let rs = roundingRadius * roundingRadius;
      // let xs = Math.sqrt(Math.abs(rs - ys));

      // console.log(rs, ys, xs);

      // let endX = xs;

      if (i % 2 === 0) {
        lines.push(<PlanetGenerator.Line key={i} x={center[0] - radius} y={y} x2={endX} y2={y + lineWidth} />);
      }
      else {
        lines.push(<PlanetGenerator.InvertedLine key={i} x={center[0] - radius} y={y} x2={endX} y2={y + lineWidth} />);
      }
    } 

    return (
      <g fill={color} stroke={color} clipPath={clip}>
        {lines}
      </g>
    );
  }

  static Line = ({x, y, x2, y2}) => {
    let path = `M ${x} ${y} ` + 
      PlanetGenerator.Curve({type: 'right', x: x2, y1: y, y2: y2}) +
      `L ${x} ${y2}`;

    return (
      <path d={path} />
    );
  }

  static InvertedLine = ({x, y, x2, y2}) => {
    let path = `M ${x} ${y} ` + 
      PlanetGenerator.Curve({type: 'right-inverted', x: x2, y1: y, y2: y2}) +
      `L ${x} ${y2}`;

    return (
      <path d={path} />
    );    
  }

  static Curve = ({type, x, y1, y2}) => {
    switch (type) {
      case 'right':
        return (`
          L ${x} ${y1}
          C ${x + 3} ${y1}
            ${x + 3} ${y2}
            ${x} ${y2}
        `);
      case 'right-inverted':
        return (`
          L ${x} ${y1 - 1}
          C ${x - 5} ${y1 - 1}
            ${x - 5} ${y2 + 1}
            ${x} ${y2 + 1}
        `);
      default:
        break;
    }
  }

  examplePlanet = () => {
    return (
      <g id="_x2D_medium--6">
        <ellipse transform="rotate(-30 753.51 634.952)" fill="#12364C" cx="753.528" cy="634.914" rx="65.843" ry="65.843"></ellipse>
        <path fill="#1B4660" d="M810.382 601.687c-18.1-30.954-58.085-41.727-89.284-24.051-5.542 3.14-10.449 6.96-14.682 11.295-.748.766.184 1.978 1.112 1.442l2.15-1.241c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-9.4 5.427c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.886 1.364 2.901.777l2.043-1.179c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-9.812 5.665c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l6.133-3.541c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-10.221 5.901c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l6.805-3.929c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-9.265 5.349c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.494-4.327c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-16.35 9.44c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l12.535-7.237c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-8.582 4.955c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l12.261-7.079c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-13.897 8.024c-1.016.586-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l6.54-3.776c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l11.037-6.372c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l3.679-2.124c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-12.673 7.317c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.886 1.364 2.901.777l16.352-9.441c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-13.9 8.025c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l9.81-5.664c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-6.133 3.541c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l17.582-10.151c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l11.037-6.372c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-1.813 1.047c-1.296.748-.445 2.743.988 2.312 4.782-1.438 9.474-3.447 13.986-6.052 31.595-18.216 42.351-58.698 23.909-90.238z"></path>
        <g fill="#386B84">
          <path d="M740.614 688.996l3.679-2.124c1.016-.587 1.364-1.886.777-2.901-.586-1.016-1.885-1.364-2.901-.777l-3.679 2.124c-1.016.587-1.364 1.886-.777 2.901.586 1.015 1.885 1.363 2.901.777zM810.382 601.687c-18.1-30.954-58.085-41.727-89.284-24.051-3.814 2.161-7.328 4.645-10.529 7.397-1.445 1.243.143 3.502 1.794 2.549l3.163-1.826c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-7.767 4.484c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.886 1.364 2.901.777l4.088-2.36c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-16.555 9.558c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l9.061-5.231c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l8.585-4.957c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-4.77 2.754c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l10.9-6.293c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-18.394 10.62c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l11.037-6.372c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l14.716-8.496c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l16.759-9.676c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-24.117 13.924c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l9.197-5.31 7.426-4.287c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-5.586 3.225c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l5.995-3.461c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-9.673 5.585c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l13.352-7.709c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-17.031 9.833c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l16.555-9.558 5.518-3.186c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-14.716 8.496c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l13.082-7.553c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-7.359 4.249c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l12.672-7.316c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.587-1.364 1.886-.777 2.901.518.897 1.642 1.241 2.573.786 1.35-.66 2.687-1.37 4.008-2.133 31.599-18.218 42.355-58.7 23.913-90.24z"></path>
        </g>
        <g fill="#3A8C99">
          <path d="M717.306 601.897c-.587-1.016-1.885-1.364-2.901-.778l-7.358 4.248c-1.016.587-1.364 1.885-.777 2.901.587 1.016 1.885 1.364 2.901.777l7.358-4.248c1.015-.585 1.363-1.884.777-2.9z"></path>
          <path d="M810.568 602.008c-18.182-31.493-58.452-42.283-89.945-24.101-2.096 1.21-4.098 2.519-6.007 3.916-.723.529-.94 1.513-.492 2.289.587 1.016 1.885 1.364 2.901.777l3.679-2.124c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.587-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l9.4-5.427c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-18.394 10.62c-1.016.587-1.364 1.885-.777 2.901.587 1.016 1.885 1.364 2.901.777l11.037-6.372c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.587-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l11.037-6.372c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-14.716 8.496c-1.016.587-1.364 1.885-.777 2.901.587 1.016 1.885 1.364 2.901.777l14.716-8.496c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-18.394 10.62c-1.016.587-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l14.716-8.496c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l11.037-6.372c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.885 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.885 1.364 2.901.777l11.037-6.372c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.885 1.364 2.901.777l3.679-2.124c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l18.394-10.62c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.587-1.364 1.885-.777 2.901.586 1.016 1.885 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.586-1.364 1.885-.777 2.901l.01.018c.581 1.006 1.867 1.35 2.873.77l.018-.011c31.494-18.156 42.284-58.425 24.101-89.918z"></path>
        </g>
        <g fill="#56C1BE">
          <path d="M790.924 686.927c.49.848 1.612 1.073 2.393.482 26.12-19.744 34.044-56.315 17.251-85.401-16.793-29.086-52.426-40.51-82.585-27.761-.902.381-1.269 1.466-.779 2.314.587 1.016 1.886 1.364 2.901.777l3.679-2.124c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l8.481-4.897c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-4.803 2.773c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-14.716 8.496c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l11.037-6.372c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l11.037-6.372c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-3.679 2.124c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l5.518-3.186c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-9.197 5.31c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l5.518-3.186c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-1.839 1.062c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.767-4.484c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-15.125 8.732c-1.016.586-1.364 1.885-.777 2.901.586 1.016 1.886 1.364 2.901.777l3.679-2.124c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l18.394-10.62c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-14.716 8.496c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l5.518-3.186 5.518-3.186c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-14.716 8.496c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.886 1.364 2.901.777l18.394-10.62c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-11.037 6.372c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l3.679-2.124c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l11.037-6.372c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-18.394 10.62c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.886 1.364 2.901.777l14.716-8.496c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901L791.698 684c-1.012.612-1.36 1.911-.774 2.927z"></path>
          <path d="M757.718 625.164l-7.358 4.248c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.358-4.248c1.016-.587 1.364-1.886.777-2.901-.586-1.016-1.885-1.364-2.901-.777z"></path>
        </g>
        <path fill="#9FE" d="M761.813 598.274l-3.679 2.124c-1.016.586-2.315.238-2.901-.777-.587-1.016-.238-2.315.777-2.901l3.679-2.124c1.016-.586 2.315-.238 2.901.777.587 1.015.239 2.314-.777 2.901zm48.755 3.734c-11.951-20.699-33.444-32.451-55.715-32.915-1.242-.026-2.468.287-3.544.908l-3.753 2.167c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l6.746-3.895c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-3.273 1.89c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l9.812-5.665c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-15.125 8.732c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l14.512-8.379c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-4.088 2.36c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l9.197-5.31c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-11.241 6.49c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l14.92-8.614c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-9.81 5.664c-1.016.586-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l4.498-2.597c1.016-.586 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-5.724 3.305c-1.016.586-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l8.994-5.193c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-11.449 6.61c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.358-4.248c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-13.488 7.787c-1.016.587-1.364 1.886-.777 2.901.586 1.016 1.885 1.364 2.901.777l15.943-9.205c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-8.585 4.957c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l5.518-3.186 6.746-3.895c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-7.358 4.248c-1.016.586-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l3.679-2.124c1.016-.587 2.315-.238 2.901.777.587 1.016.238 2.315-.777 2.901l-11.449 6.61c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l7.77-4.486c1.016-.587 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-12.876 7.434c-1.016.587-1.364 1.886-.777 2.901.587 1.016 1.886 1.364 2.901.777l1.839-1.062c1.016-.586 2.315-.238 2.901.777.586 1.016.238 2.315-.777 2.901l-5.724 3.305c-1.016.586-1.364 1.885-.777 2.901.587 1.016 1.886 1.364 2.901.777l6.41-3.701c1.076-.621 1.96-1.527 2.558-2.615 10.736-19.494 11.305-43.983-.646-64.683z"></path>
      </g>
    );
  }

  render() {
    return (
      <div className='planet'>
        <svg style={{ height: '100vh', width: '100vw' }}>
          {this.examplePlanet()}
          <PlanetGenerator.Create />
        </svg>
      </div>
    );
  }
}