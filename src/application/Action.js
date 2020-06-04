export const Action = (handler) => {
    return (request, response, next) => {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        Promise.resolve(handler(request, response, next)).catch(next);
    };
};
