import { transformUserData } from '../utils/transform';
import { lineChartOptions, userYMax } from '../utils/chart';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Figure from './Figure';

function UserGrowth(props) {
    return (
        <Figure title="User Growth" className="w-full">
            {Object.keys(props).length > 0 && (
                <Line
                    data={transformUserData(props)}
                    options={lineChartOptions(
                        'Time',
                        'Number of Users',
                        userYMax(props),
                    )}
                />
            )}
        </Figure>
    );
}

export default UserGrowth;
