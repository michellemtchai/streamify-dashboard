export const resourceUrls = [
    '/api/user/metrics',
    '/api/user/growth',
    '/api/user/revenue',
    '/api/streams/top5',
    '/api/streams/recent',
];

export const dashBoardDataKeys = [
    'metrics',
    'userGrowth',
    'revenue',
    'top5',
    'recent',
];

export const userGrowthKeys = ['totalUsers', 'activeUsers'];

export const streamTableEntryKeys = [
    'songName',
    'artist',
    'dateStreamed',
    'streamCount',
    'userId',
];

export const streamTableHeadings = [
    'Song Name',
    'Artist',
    'Date Streamed',
    'Stream Count',
    'User ID',
];

export const streamTableFilterTypes = [
    'string',
    'string',
    'date',
    'number',
    'number',
];

export const dateInputTypes = ['on', 'before', 'after', 'between'];

export const dateInputLabels = [
    'On Date',
    'Before Date',
    'After Date',
    'Between Dates',
];

export const dateInputDefaults = {
    on: {
        date: new Date(),
    },
    before: {
        date: new Date(),
    },
    after: {
        date: new Date(),
    },
    between: {
        start: new Date(),
        end: new Date(),
    },
};

export const defaultFilterOptions = {
    selected: [],
    inputs: {},
};
