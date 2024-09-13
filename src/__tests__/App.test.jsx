import React from 'react';
import {
    render,
    cleanup,
    screen,
    waitFor,
    fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import {
    waitForFetch,
    checkStreamTableEntriesOrder,
    clickHeadingOnce,
    clickHeadingTwice,
    applyFilters,
} from './__setup__/utils';

import App from '../App';
import keyMetrics from '../server/keyMetrics';
import recent from '../server/recentStreams';
import revenue from '../server/revenueDistribution';
import top5 from '../server/top5Streams';
import userGrowth from '../server/userGrowth';

describe('App Component', () => {
    beforeEach(() => {
        jest.mock('../utils/constants', () => {
            let original = jest.requireActual('../utils/constants');
            return {
                ...original,
                dateInputDefaults: {
                    on: { date: new Date('09/01/24') },
                    before: { date: new Date('08/21/24') },
                    after: { date: new Date('09/10/24') },
                    between: {
                        start: new Date('09/01/24'),
                        end: new Date('09/10/24'),
                    },
                },
                defaultFilterOptions: {
                    selected: [],
                    inputs: {
                        3: { min: 1487, max: 1950 },
                        4: { min: 37, max: 64 },
                    },
                },
            };
        });
        render(<App />);
    });
    describe('without waiting for fetch', () => {
        test('renders page component', async () => {
            await waitFor(() => {
                let elem = screen.getByTestId('page');
                expect(elem).toBeInTheDocument();
            });
        });

        test('renders header & header text', async () => {
            await waitFor(() => {
                let elem1 = screen.getByTestId('header');
                expect(elem1).toBeInTheDocument();
                let elem2 = screen.getByTestId('header-text');
                expect(elem2).toBeInTheDocument();
                expect(elem2).toHaveTextContent('Streamify');
            });
        });

        test('renders main article', async () => {
            await waitFor(() => {
                let elem = screen.getByTestId('main-article');
                expect(elem).toBeInTheDocument();
            });
        });

        test('renders footer & footer text', async () => {
            await waitFor(() => {
                let elem1 = screen.getByTestId('footer');
                expect(elem1).toBeInTheDocument();
                let elem2 = screen.getByTestId('footer-text');
                expect(elem2).toBeInTheDocument();
                expect(elem2).toHaveTextContent('Streamify © 2024');
            });
        });

        test('renders loader', async () => {
            await waitFor(async () => {
                let elem = screen.getByTestId('loader');
                expect(elem).toBeInTheDocument();
            });
        });
    });
    describe('server connection error', () => {
        let originalFetch;
        beforeAll(() => {
            originalFetch = fetch;
            global.fetch = jest.fn(() => Promise.reject({}));
        });
        afterAll(() => {
            global.fetch = originalFetch;
        });
        test('renders server error message', async () => {
            await waitFor(async () => {
                let elem = screen.getByTestId('server-error');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent(
                    'An Error occurred while trying to reach the server. Try refreshing to load the page.',
                );
            });
        });
    });

    describe('after waiting for fetch', () => {
        describe('renders key metrics section', () => {
            test('renders section and title', async () => {
                await waitForFetch();
                let elem = screen.getByTestId('key-metrics');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent('Key Metrics');
            });
            test('renders active users', async () => {
                await waitForFetch();
                let elem = screen.getByTestId('active-users');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent('Active Users');
                expect(elem).toHaveTextContent(
                    `${keyMetrics.activeUsers}/${keyMetrics.totalUsers}`,
                );
            });
            test('renders total streams', async () => {
                await waitForFetch();
                let elem = screen.getByTestId('total-streams');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent('Total Streams');
                expect(elem).toHaveTextContent(keyMetrics.totalStreams);
            });
            test('renders revenue', async () => {
                await waitForFetch();
                let elem = screen.getByTestId('total-revenue');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent('Revenue');
                expect(elem).toHaveTextContent(`$${keyMetrics.revenue}`);
            });
        });
        describe('renders data visualization section', () => {
            test('renders section and titles', async () => {
                await waitForFetch();
                let elem = screen.getByTestId('data-visualization');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent('Revenue');
                expect(elem).toHaveTextContent('User Growth');
                expect(elem).toHaveTextContent('Top 5 Streams');
            });
            describe('renders top 5 streams table', () => {
                test('renders table and headings', async () => {
                    await waitForFetch();
                    let elem = screen.getByTestId('top5-streams-table');
                    expect(elem).toBeInTheDocument();
                    expect(elem).toHaveTextContent('Song Name');
                    expect(elem).toHaveTextContent('Artist');
                    expect(elem).toHaveTextContent('Date Streamed');
                    expect(elem).toHaveTextContent('Stream Count');
                    expect(elem).toHaveTextContent('User ID');
                });
                test('renders all table entries ordered by song name (asc)', async () => {
                    await waitForFetch();
                    let orderedIndices = [4, 3, 2, 0, 1];
                    checkStreamTableEntriesOrder(
                        orderedIndices,
                        'top5-streams-table',
                        top5,
                    );
                });
                describe('click on table heading', () => {
                    describe('Song Name', () => {
                        describe('once', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'top5-streams-table',
                                    0,
                                    'Song Name',
                                    false,
                                );
                                let orderedIndices = [1, 0, 2, 3, 4];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'top5-streams-table',
                                    0,
                                    'Song Name',
                                    false,
                                );
                                let orderedIndices = [4, 3, 2, 0, 1];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                    });
                    describe('Artist', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'top5-streams-table',
                                    1,
                                    'Artist',
                                    true,
                                );
                                let orderedIndices = [4, 3, 2, 0, 1];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'top5-streams-table',
                                    1,
                                    'Artist',
                                    true,
                                );
                                let orderedIndices = [1, 0, 2, 3, 4];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                    });
                    describe('Date Streamed', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'top5-streams-table',
                                    2,
                                    'Date Streamed',
                                    true,
                                );
                                let orderedIndices = [2, 0, 1, 4, 3];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'top5-streams-table',
                                    2,
                                    'Date Streamed',
                                    true,
                                );
                                let orderedIndices = [3, 4, 1, 0, 2];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                    });
                    describe('Stream Count', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'top5-streams-table',
                                    3,
                                    'Stream Count',
                                    true,
                                );
                                let orderedIndices = [4, 3, 2, 1, 0];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'top5-streams-table',
                                    3,
                                    'Stream Count',
                                    true,
                                );
                                let orderedIndices = [0, 1, 2, 3, 4];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                    });
                    describe('User ID', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'top5-streams-table',
                                    4,
                                    'User ID',
                                    true,
                                );
                                let orderedIndices = [4, 3, 2, 0, 1];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'top5-streams-table',
                                    4,
                                    'User ID',
                                    true,
                                );
                                let orderedIndices = [1, 0, 2, 3, 4];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'top5-streams-table',
                                    top5,
                                );
                            });
                        });
                    });
                });
            });
        });
        describe('renders recent streams section', () => {
            test('renders section and title', async () => {
                await waitForFetch();
                let elem = screen.getByTestId('recent-streams');
                expect(elem).toBeInTheDocument();
                expect(elem).toHaveTextContent('Recent Streams');
            });
            describe('renders filter options', () => {
                test('renders component and summary', async () => {
                    await waitForFetch();
                    let elem = screen.getByTestId(
                        'recent-streams-filter-options',
                    );
                    expect(elem).toBeInTheDocument();
                    expect(elem).toHaveTextContent('Filter Options');
                });
                test('renders all options', async () => {
                    await waitForFetch();
                    let options = [
                        'Song Name',
                        'Artist',
                        'Date Streamed',
                        'Stream Count',
                        'User ID',
                    ];
                    for (let i = 0; i < options.length; i++) {
                        let elem1 = screen.getByTestId(
                            `recent-streams-choice-${i}-unchecked`,
                        );
                        let elem2 = screen.getByTestId(
                            `recent-streams-choice-${i}-label`,
                        );
                        expect(elem1).toBeInTheDocument();
                        expect(elem2).toBeInTheDocument();
                        expect(elem2).toHaveTextContent(options[i]);
                    }
                });
                test('renders apply filters button', async () => {
                    await waitForFetch();
                    let elem = screen.getByTestId(
                        'recent-streams-apply-filters',
                    );
                    expect(elem).toHaveTextContent('Apply Filters');
                });
                describe('set value for option', () => {
                    describe('Song Name', () => {
                        describe('query = 1', () => {
                            test('renders 2 entries in streams table', async () => {
                                let input = {
                                    type: 'text',
                                    key: 'recent-streams',
                                    label: 'Song Name',
                                    indices: [0, 9],
                                    data: recent,
                                    value: '1',
                                    index: 0,
                                };
                                await waitForFetch();
                                await applyFilters(input);
                            });
                        });
                    });
                    describe('Artist', () => {
                        describe('query = artistName5', () => {
                            test('renders 1 entry in streams table', async () => {
                                let input = {
                                    type: 'text',
                                    key: 'recent-streams',
                                    label: 'Artist',
                                    indices: [4],
                                    data: recent,
                                    value: 'artistName5',
                                    index: 1,
                                };
                                await waitForFetch();
                                await applyFilters(input);
                            });
                        });
                    });
                    describe('Date Streamed', () => {
                        describe('On Date', () => {
                            describe('date = 09/01/2024', () => {
                                test('renders 1 entry in streams table', async () => {
                                    let input = {
                                        type: 'date',
                                        key: 'recent-streams',
                                        label: 'Date Streamed',
                                        indices: [0],
                                        data: recent,
                                        value: {
                                            selected: 0,
                                            display: '09/01/2024',
                                        },
                                        index: 2,
                                    };
                                    await waitForFetch();
                                    await applyFilters(input);
                                });
                            });
                        });
                        describe('Before Date', () => {
                            describe('date = 08/21/2024', () => {
                                test('renders 2 entries in streams table', async () => {
                                    let input = {
                                        type: 'date',
                                        key: 'recent-streams',
                                        label: 'Date Streamed',
                                        indices: [2, 7],
                                        data: recent,
                                        value: {
                                            selected: 1,
                                            display: '08/21/2024',
                                        },
                                        index: 2,
                                    };
                                    await waitForFetch();
                                    await applyFilters(input);
                                });
                            });
                        });
                        describe('After Date', () => {
                            describe('date = 09/10/2024', () => {
                                test('renders 1 entry in streams table', async () => {
                                    let input = {
                                        type: 'date',
                                        key: 'recent-streams',
                                        label: 'Date Streamed',
                                        indices: [6],
                                        data: recent,
                                        value: {
                                            selected: 2,
                                            display: '09/10/2024',
                                        },
                                        index: 2,
                                    };
                                    await waitForFetch();
                                    await applyFilters(input);
                                });
                            });
                        });
                        describe('Between Date', () => {
                            describe('start = 09/01/2024, end= 09/10/2024', () => {
                                test('renders 3 entries in streams table', async () => {
                                    let input = {
                                        type: 'date',
                                        key: 'recent-streams',
                                        label: 'Date Streamed',
                                        indices: [0, 1, 5],
                                        data: recent,
                                        value: {
                                            selected: 3,
                                            display: '09/01/2024 - 09/10/2024',
                                        },
                                        index: 2,
                                    };
                                    await waitForFetch();
                                    await applyFilters(input);
                                });
                            });
                        });
                    });
                });
                describe('Stream Count', () => {
                    describe('min = 1487, max = 1950', () => {
                        test('renders 2 entries in streams table', async () => {
                            let input = {
                                type: 'number',
                                key: 'recent-streams',
                                label: 'Stream Count',
                                indices: [9, 4],
                                data: recent,
                                value: {
                                    min: 1487,
                                    max: 1950,
                                },
                                index: 3,
                            };
                            await waitForFetch();
                            await applyFilters(input);
                        });
                    });
                });
                describe('User ID', () => {
                    describe('min = 37, max = 64', () => {
                        test('renders 1 entry in streams table', async () => {
                            let input = {
                                type: 'number',
                                key: 'recent-streams',
                                label: 'User ID',
                                indices: [4],
                                data: recent,
                                value: {
                                    min: 37,
                                    max: 64,
                                },
                                index: 4,
                            };
                            await waitForFetch();
                            await applyFilters(input);
                        });
                    });
                });
            });
            describe('renders streams table', () => {
                test('renders table and headings', async () => {
                    await waitForFetch();
                    let elem = screen.getByTestId('recent-streams-table');
                    expect(elem).toBeInTheDocument();
                    expect(elem).toHaveTextContent('Song Name');
                    expect(elem).toHaveTextContent('Artist');
                    expect(elem).toHaveTextContent('Date Streamed');
                    expect(elem).toHaveTextContent('Stream Count');
                    expect(elem).toHaveTextContent('User ID');
                });
                test('renders all table entries ordered by song name (asc)', async () => {
                    await waitForFetch();
                    let orderedIndices = [0, 9, 1, 2, 3, 4, 5, 6, 7, 8];
                    checkStreamTableEntriesOrder(
                        orderedIndices,
                        'recent-streams-table',
                        recent,
                    );
                });
                describe('click on table heading', () => {
                    describe('Song Name', () => {
                        describe('once', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'recent-streams-table',
                                    0,
                                    'Song Name',
                                    false,
                                );
                                let orderedIndices = [
                                    8, 7, 6, 5, 4, 3, 2, 1, 9, 0,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'recent-streams-table',
                                    0,
                                    'Song Name',
                                    false,
                                );
                                let orderedIndices = [
                                    0, 9, 1, 2, 3, 4, 5, 6, 7, 8,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                    });
                    describe('Artist', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'recent-streams-table',
                                    1,
                                    'Artist',
                                    true,
                                );
                                let orderedIndices = [
                                    0, 9, 1, 2, 3, 4, 5, 6, 7, 8,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'recent-streams-table',
                                    1,
                                    'Artist',
                                    true,
                                );
                                let orderedIndices = [
                                    8, 7, 6, 5, 4, 3, 2, 1, 9, 0,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                    });
                    describe('Date Streamed', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'recent-streams-table',
                                    2,
                                    'Date Streamed',
                                    true,
                                );
                                let orderedIndices = [
                                    2, 7, 3, 8, 4, 9, 0, 5, 1, 6,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'recent-streams-table',
                                    2,
                                    'Date Streamed',
                                    true,
                                );
                                let orderedIndices = [
                                    6, 1, 5, 0, 9, 4, 8, 3, 7, 2,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                    });
                    describe('Stream Count', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'recent-streams-table',
                                    3,
                                    'Stream Count',
                                    true,
                                );
                                let orderedIndices = [
                                    5, 0, 6, 1, 7, 2, 9, 4, 8, 3,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'recent-streams-table',
                                    3,
                                    'Stream Count',
                                    true,
                                );
                                let orderedIndices = [
                                    3, 8, 4, 9, 2, 7, 1, 6, 0, 5,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                    });
                    describe('User ID', () => {
                        describe('once', () => {
                            test('renders entries in asc order', async () => {
                                await waitForFetch();
                                await clickHeadingOnce(
                                    'recent-streams-table',
                                    4,
                                    'User ID',
                                    true,
                                );
                                let orderedIndices = [
                                    0, 5, 6, 1, 7, 2, 3, 9, 4, 8,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                        describe('twice', () => {
                            test('renders entries in desc order', async () => {
                                await waitForFetch();
                                await clickHeadingTwice(
                                    'recent-streams-table',
                                    4,
                                    'User ID',
                                    true,
                                );
                                let orderedIndices = [
                                    8, 4, 9, 3, 2, 7, 1, 6, 5, 0,
                                ];
                                checkStreamTableEntriesOrder(
                                    orderedIndices,
                                    'recent-streams-table',
                                    recent,
                                );
                            });
                        });
                    });
                });
            });
        });
    });
});
