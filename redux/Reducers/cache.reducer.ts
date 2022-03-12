interface ActionDispatchCache {
    type: string;
    payload: {
        url: string;
        data: [];
    };
}
export const CacheReducer = (state: { [key: string]: [] }={}, action: ActionDispatchCache) => {
    switch (action.type) {
        case 'ADD':
            return (state[action.payload.url] = action.payload.data);
        default:
            return state;
    }
};
