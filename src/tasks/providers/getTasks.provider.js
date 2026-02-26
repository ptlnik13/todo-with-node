const Task = require("../task.schema");
const {matchedData} = require('express-validator');
const {StatusCodes} = require("http-status-codes");
const errorLogger = require("../../helpers/errorLogger.helper");


async function getTasksProvider(req, res) {
    const data = matchedData(req);
    try {
        const totalTask = await Task.countDocuments();
        const currentPage = data.page || 1;
        const limit = data.limit || 10;
        const order = data.order || 'asc';
        const totalPages = Math.ceil(totalTask / limit);
        const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
        const prevPage = currentPage === 1 ? currentPage : currentPage - 1;
        const baseUrl = `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}`;

        const tasks = await Task.find({status: {$in: ['todo', 'inProgress']}})
            .limit(limit)
            .skip((currentPage - 1) * limit)
            .sort({createdAt: order === 'asc' ? 1 : -1});

        let finalResponse = {
            data      : tasks,
            pagination: {
                meta : {
                    itemsPerPage: limit,
                    totalItems  : totalTask,
                    currentPage : currentPage,
                    totalPages  : totalPages,
                },
                links: {
                    first      : `${baseUrl}?page=1&limit=${limit}&order=${order}`,
                    last       : `${baseUrl}?page=${totalPages}&limit=${limit}&order=${order}`,
                    currentPage: `${baseUrl}?page=${currentPage}&limit=${limit}&order=${order}`,
                    next       : `${baseUrl}?page=${nextPage}&limit=${limit}&order=${order}`,
                    prev       : `${baseUrl}?page=${prevPage}&limit=${limit}&order=${order}`
                }
            }
        }

        return res.status(StatusCodes.OK).json(finalResponse);
    } catch (error) {
        errorLogger("Error while fetching tasks:", req, error);
        return res.status(StatusCodes.GATEWAY_TIMEOUT).json({reason: 'Failed to fetch tasks'});
    }
}

module.exports = getTasksProvider;
