import Section from './Section';
import Revenue from './Revenue';
import UserGrowth from './UserGrowth';
import Top5Streams from './Top5Streams';

function Visualization({ revenue, userGrowth, top5 }) {
    return (
        <Section className="flex flex-row">
            <Revenue {...revenue} />
            <div className="flex flex-col flex-1">
                <UserGrowth {...userGrowth} />
                <Top5Streams data={top5} />
            </div>
        </Section>
    );
}

export default Visualization;
