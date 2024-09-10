import { createServer } from 'miragejs';
import keyMetrics from './keyMetrics';
import userGrowth from './userGrowth';
import revenueDistribution from './revenueDistribution';
import top5Streams from './top5Streams';
import recentStreams from './recentStreams';

const setupServer = () =>
    createServer({
        routes() {
            this.get('/api/user/metrics', () => keyMetrics);
            this.get('/api/user/growth', () => userGrowth);
            this.get('/api/user/revenues', () => revenueDistribution);
            this.get('/api/streams/top5', () => top5Streams);
            this.get('/api/streams/recent', () => recentStreams);
        },
    });

export default setupServer;
