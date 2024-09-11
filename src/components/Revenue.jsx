import { transformRevenueData } from '../utils/transform';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function Revenue(props) {
  return (
    <section>
      <h3>Revenue</h3>
      <Pie data={transformRevenueData(props)} />
    </section>
  );
}

export default Revenue;
