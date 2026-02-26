const {getReasonPhrase} = require('http-status-codes');

function responseFormatter(req, res, next) {
    const originalJson = res.json;
    res.json = (data) => {
        const response = {
            status    : res.statusCode >= 200 && res.statusCode < 300 ? 'success' : 'error',
            statusCode: res.statusCode,
            message   : getReasonPhrase(res.statusCode),
        }
        if (res.statusCode >= 200 && res.statusCode < 300) response.data = data.pagination ? data.data : data;
        if (data.pagination) response.pagination = data.pagination;
        if (res.statusCode > 300) response.error = data;
        originalJson.call(res, response);
    };
    next();
}


module.exports = responseFormatter;
