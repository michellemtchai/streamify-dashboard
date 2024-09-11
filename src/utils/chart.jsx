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
    ...hoverOptions,
});

export const userYMax = (data) => {
    return data.totalUsers[data.totalUsers.length - 1];
};

export const pieChartOptions = (format) => ({
    plugins: {
        tooltip: {
            callbacks: {
                label: (ttItem) => `${ttItem.label}: ${format(ttItem.parsed)}`,
            },
        },
    },
    ...hoverOptions,
});

const hoverOptions = {
    interaction: {
        mode: 'index',
    },
    onHover: function (event) {
        const points = this.getElementsAtEventForMode(
            event,
            'index',
            {
                axis: 'x',
                intersect: true,
            },
            false,
        );

        if (points.length) {
            event.native.target.style.cursor = 'pointer';
        } else {
            event.native.target.style.cursor = 'default';
        }
    },
};
