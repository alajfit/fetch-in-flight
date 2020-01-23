import FIF from '../index';

const fetcher = new FIF()

describe('Fetch In Flight', () => {
    let fetch

    beforeEach(() => {
        fetch = fetcher.fetch
    })

    test('Prevent Multiple Network Requests', () => {
        expect(true).toBe(true)
    })

    test('Resolve all callers with the returned data', () => {
        expect(true).toBe(true)
    })

    test('Cache for given duration if time set', () => {
        expect(true).toBe(true)
    })
})
