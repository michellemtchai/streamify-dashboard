import { ReadableStream } from 'node:stream/web';
import { TextEncoder, TextDecoder } from 'util';
import { cleanup } from '@testing-library/react';

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));
Object.assign(global, {
    ReadableStream,
    TextDecoder,
    TextEncoder,
});

afterEach(() => {
    cleanup();
});
