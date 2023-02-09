import React from 'react';
import './FunnelChart.scss';

const FunnelChart = () => {
  return (
    <>
      <div className='funnel-chart funnel-chart-1'>
        <p className='chart-content'>Fee Hungry People</p>
      </div>
      <div className='funnel-chart funnel-chart-2'>
        <p className='chart-content'>Feed Animals</p>
      </div>
      <div className='funnel-chart funnel-chart-3'>
        <p className='chart-content'>Industrial Uses</p>
      </div>
      <div className='funnel-chart funnel-chart-4'>
        <p className='chart-content'>Composting</p>
      </div>
      <div className='funnel-chart funnel-chart-5'>
        <p className='chart-content'>
          Incineration
          <br />
          <span className='or'>or</span>
          <br />
          <span className='landfill'>landfill</span>
        </p>
      </div>
    </>
  );
};

export default FunnelChart;
