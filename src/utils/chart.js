export const lineChartOptions = (xAxisTitle, yAxisTitle, { min, max }) => ({
    scales: {
        y: {
            suggestedMin: min,
            suggestedMax: max,
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

export const yMinMax = (data, keys) => {
    let min = data[keys[0]][0];
    let max = data[keys[0]][0];
    for (let key of keys) {
        for (let entry of data[key]) {
            if (entry < min) {
                min = entry;
            }
            if (entry > max) {
                max = entry;
            }
        }
    }
    return { min, max };
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
