import React from 'react';
import PieChart from 'highcharts-react-official';
import Highcharts from 'highcharts';

Highcharts.setOptions({
  colors: Highcharts.getOptions().colors.map(function (color) {
    return {
      radialGradient: {
        cx: 0.5,
        cy: 0.3,
        r: 0.7,
      },
      stops: [
        [0, color],
        [1, Highcharts.color(color).brighten(-0.3).get('rgb')], 
      ],
    };
  }),
});

const options = {
  title: {
    text: '',
  },
  tooltip: {
    pointFormat: '<b>{point.y} lbs</b>',
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      size: 200,
      startAngle: 50,
      dataLabels: {
        enabled: false,
      }
    },
  },
  chart: {
    type: 'pie',
    height: 230,
    width: 220,
  },
  series: [
    {
      name: 'Share',
      data: [
        {
          name: 'Catering Leftovers',
          y: 717,
          color: '#02AF50',
        },
        {
          name: 'Overproduction',
          y: 72,
          color: '#FE0103',
        },
        {
          name: 'Whoops',
          y: 36,
          color: '#FE0103',
        },
        {
          name: 'Trim, Bones, Shells',
          y: 27,
          color: '#FE0103',
        },
        {
          name: 'Plaste Waste',
          y: 18,
          color: '#FE0103',
        },
        {
          name: 'Poor Quality',
          y: 18,
          color: '#FE0103',
        },
        {
          name: 'Odd and Ends',
          y: 9,
          color: '#FE0103',
        },
      ],
    },
  ],
};

const Piechart = () => {
  return <PieChart highcharts={Highcharts} options={options} />;
};

export default Piechart;
