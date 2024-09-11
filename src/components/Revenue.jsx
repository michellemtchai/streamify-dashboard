import { transformRevenueData } from '../utils/transform';
import { pieChartOptions } from '../utils/chart';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Figure from './Figure';

function Revenue(props) {
  return (
    <Figure title="Revenue" className="w-2/5">
      <Pie
        data={transformRevenueData(props)}
        options={pieChartOptions((data) => `$${data}`)}
      />
    </Figure>
  );
}

export default Revenue;
