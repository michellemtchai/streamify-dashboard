import {
    screen,
    waitFor,
    waitForElementToBeRemoved,
    fireEvent,
} from '@testing-library/react';

export const waitForFetch = async () => {
    let loader = screen.getByTestId('loader');
    await waitForElementToBeRemoved(loader, { timeout: 30000 });
    await waitFor(() => {
        let elem1 = screen.getByTestId('recent-streams-table-row-0');
        expect(elem1).toBeInTheDocument();
        let elem2 = screen.getByTestId('top5-streams-table-row-0');
        expect(elem2).toBeInTheDocument();
    });
};

export const checkStreamTableEntriesOrder = (orderedIndices, testId, data) => {
    for (let i = 0; i < orderedIndices.length; i++) {
        let elem = screen.getByTestId(`${testId}-row-${i}`);
        let entry = data[orderedIndices[i]];
        let values = [
            entry.songName,
            entry.artist,
            entry.dateStreamed,
            entry.streamCount,
            entry.userId,
        ];
        expect(elem).toHaveTextContent(values.join(''));
    }
    let extraRow = screen.queryByTestId(
        `${testId}-row-${orderedIndices.length}`,
    );
    expect(extraRow).not.toBeInTheDocument();
};

export const clickHeadingOnce = async (key, index, heading, startsPlain) => {
    let elem1 = screen.getByTestId(
        `${key}-heading-${index}${!startsPlain ? '-asc' : ''}`,
    );
    expect(elem1).toHaveTextContent(`${heading}${startsPlain ? '' : ' ▲'}`);
    fireEvent.click(elem1);
    let elem2;
    await waitFor(() => {
        elem2 = screen.getByTestId(
            `${key}-heading-${index}${startsPlain ? '-asc' : '-desc'}`,
        );
        expect(elem2).toHaveTextContent(
            `${heading}${startsPlain ? ' ▲' : ' ▼'}`,
        );
    });
    return elem2;
};

export const clickHeadingTwice = async (key, index, heading, startsPlain) => {
    let elem1 = await clickHeadingOnce(key, index, heading, startsPlain);
    fireEvent.click(elem1);
    await waitFor(() => {
        let elem2 = screen.getByTestId(
            `${key}-heading-${index}${startsPlain ? '-desc' : '-asc'}`,
        );
        expect(elem2).toHaveTextContent(
            `${heading}${startsPlain ? ' ▼' : ' ▲'}`,
        );
    });
};

const setInputValue = (elem, value) => {
    fireEvent.change(elem, { target: { value } });
    expect(elem).toHaveAttribute('value', value);
};

const applyTypeSpecificActions = async (type, key, index, value) => {
    let labels = ['On Date', 'Before Date', 'After Date', 'Between Dates'];
    switch (type) {
        case 'text':
            let elem1 = screen.getByTestId(`${key}-choice-${index}-input`);
            expect(elem1).toBeInTheDocument();
            setInputValue(elem1, value);
            break;
        case 'date':
            let elem2 = screen.getByTestId(
                `${key}-choice-${index}-input-option-${value.selected}`,
            );
            expect(elem2).toBeInTheDocument();
            expect(elem2).toHaveTextContent(labels[value.selected]);
            fireEvent.click(elem2);

            await waitFor(() => {
                let elem3 = screen.getByTestId(
                    `${key}-choice-${index}-input-option-${value.selected}-input`,
                );
                expect(elem3).toBeInTheDocument();
                expect(elem3).toHaveTextContent(value.display);
            });
            break;
        case 'number':
            setTimeout(async () => {
                await waitFor(() => {
                    let elem4 = screen.getByTestId(
                        `${key}-choice-${index}-input-min`,
                    );
                    expect(elem4).toBeInTheDocument();
                    expect(elem4).toHaveTextContent('Min');
                    expect(elem4).toHaveTextContent(value.min);
                    let elem5 = screen.getByTestId(
                        `${key}-choice-${index}-input-max`,
                    );
                    expect(elem5).toBeInTheDocument();
                    expect(elem5).toHaveTextContent('Max');
                    expect(elem5).toHaveTextContent(value.max);
                });
            }, 30000);
            break;
    }
};

export const applyFilters = async ({
    type,
    key,
    index,
    label,
    value,
    indices,
    data,
}) => {
    let elem1 = screen.getByTestId(`${key}-choice-${index}-unchecked`);
    expect(elem1).toBeInTheDocument();

    let elem2 = screen.getByTestId(`${key}-choice-${index}-label`);
    expect(elem2).toBeInTheDocument();
    expect(elem2).toHaveTextContent(label);

    fireEvent.click(elem1);
    await waitFor(() => {
        let elem3 = screen.getByTestId(`${key}-choice-${index}-checked`);
        expect(elem3).toBeInTheDocument();
    });

    await applyTypeSpecificActions(type, key, index, value);

    let elem5 = screen.getByTestId(`${key}-apply-filters`);
    fireEvent.click(elem5);
    setTimeout(async () => {
        await waitFor(() => {
            let elem6 = screen.getByTestId(`${key}-filtered-table`);
            expect(elem6).toBeDefined();
            checkStreamTableEntriesOrder(
                indices,
                `${key}-filtered-table`,
                data,
            );
        });
    }, 20000);
};
