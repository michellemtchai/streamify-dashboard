export const transformStreamData = (data) => {
    return data.map((entry) => [
        entry.songName,
        entry.artist,
        entry.dateStreamed,
        entry.streamCount,
        entry.userId,
    ]);
};

export const transformRevenueData = (data, title) => {
    let keys = Object.keys(data);
    return {
        labels: keys,
        datasets: [
            {
                label: title,
                data: keys.map((key) => data[key]),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                ],
                hoverOffset: 4,
                borderWidth: 1,
            },
        ],
    };
};

export const transformUserData = (data) => {
    return {
        labels: data.time,
        datasets: [
            {
                label: 'Total Users',
                data: data.totalUsers,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
            },
            {
                label: 'Active Users',
                data: data.activeUsers,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
};
