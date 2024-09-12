export const streamTableHeadings = [
    'Song Name',
    'Artist',
    'Date Streamed',
    'Stream Count',
    'User ID',
];

export const streamTableFilterOptions = [
    {
        type: 'string',
        label: 'Song Name',
    },
    {
        type: 'string',
        label: 'Artist',
    },
    {
        type: 'date',
        label: 'Date Streamed',
    },
    {
        type: 'number',
        label: 'Stream Count',
    },
    {
        type: 'number',
        label: 'User ID',
    },
];

export const streamTableFilterLabels = [
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
