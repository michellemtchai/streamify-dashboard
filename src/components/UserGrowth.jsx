import { transformUserData } from '../utils/transform';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function UserGrowth(props) {
    return (
        <section>
            <h3>User Growth</h3>
            {Object.keys(props).length > 0 && (
                <Line data={transformUserData(props)} />
            )}
        </section>
    );
}

export default UserGrowth;
