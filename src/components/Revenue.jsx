import React from 'react';
import { transformRevenueData } from '../utils/transform';
import { pieChartOptions } from '../utils/chart';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Figure from './Figure';

function Revenue(props) {
  return (
    <Figure title="Revenue" className="mx-auto w-11/12 lg:w-2/5 align-top">
      <Pie
        data={transformRevenueData(props)}
        options={pieChartOptions((data) => `$${data}`)}
      />
    </Figure>
  );
}

export default Revenue;
