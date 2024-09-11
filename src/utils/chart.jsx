export const lineChartOptions = (xAxisTitle, yAxisTitle, yMax) => ({
    scales: {
        y: {
            beginAtZero: true,
            suggestedMax: yMax,
        },
        xAxes: {
            title: {
                display: true,
                text: xAxisTitle,
            },
            ticks: {
                display: false,
            },
        },
        yAxes: {
            title: {
                display: true,
                text: yAxisTitle,
                autoSkip: true,
            },
            ticks: {
                display: false,
            },
        },
    },
});

export const userYMax = (data) => {
    return data.totalUsers[data.totalUsers.length - 1];
};
