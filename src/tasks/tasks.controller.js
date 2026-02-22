function handleGetTask(req, res) {
    let response = [
        {
            title      : "Title Of the Task",
            date       : "2025-01-01T12:00:00Z",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
            priority   : "normal",
            status     : "todo",
        },
        {
            title      : "Title Of the Task 2",
            date       : "2025-01-01T12:00:00Z",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lobortis diam vel malesuada ultricies.",
            priority   : "normal",
            status     : "inProgress",
        },
    ];
    res.status(200).json(response);
}

function handlePostTask(req, res) {
    res.send('POST Task Controller');
}

function handlePatchTask(req, res) {
    res.send('PATCH Task Controller');
}

function handleDeleteTask(req, res) {
    res.send('DELETE Task Controller');
}

module.exports = {handleGetTask, handlePostTask, handlePatchTask, handleDeleteTask};
