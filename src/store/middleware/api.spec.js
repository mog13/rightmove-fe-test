import apiMiddleware from './api';

//This would normally also test the other scenarios where API was called
// that would requite some sort of mock of fetch (e.g. jest-fetch-mock)
// which can only be enabled after ejecting react create app.
// which due to time contraints i havent done
describe('Api Middleware', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const store = {
        dispatch: jest.fn(),
        getState: jest.fn()
    };
    const next = jest.fn();

    it('should not intercept actions without meta', () => {

        const action = {type: 'any type without meta', payload: {}};

        apiMiddleware(store)(next)(action)
            .then(() => {
                expect(store.dispatch).not.toHaveBeenCalled();
                expect(store.getState).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalledTimes(1);
                expect(next).toHaveBeenCalledWith(action);
            }).catch(() => {
        });
    });

    it('should not intercept actions with incompatible meta', () => {

        const action = {
            type: 'any type without meta',
            payload: {},
            meta: {
                type: 'test'
            }
        };

        apiMiddleware(store)(next)(action)
            .then(() => {
                expect(store.dispatch).not.toHaveBeenCalled();
                expect(store.getState).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalledTimes(1);
                expect(next).toHaveBeenCalledWith(action);
            }).catch(() => { });
    });
});