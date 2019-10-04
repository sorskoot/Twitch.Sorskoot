let azure = require('azure-storage');

module.exports = async function (context, req, inputLoyaltyTable) {
    if (req.method === "GET") {
        if (req.query.name) {
            const points = inputLoyaltyTable.filter(l => l.RowKey === req.query.name)[0];
            context.res = {
                body: points ? points.points : 0
            }
        } else {
            context.res = {
                body: inputLoyaltyTable
            }
        }


    } else {
        if (req.method === "POST") {
            if (typeof req.body != 'undefined' && typeof req.body == 'object') {
                statusCode = 201;
                const points = inputLoyaltyTable.filter(l => l.RowKey === req.query.name)[0] || 0;
                let item =
                    { PartitionKey: 'loyalty', RowKey: req.body.name, points: (points ? points.points : 0) + req.body.points };

                let connectionString = process.env.twitchsorskoot_STORAGE;
                let tableService = azure.createTableService(connectionString);
                tableService.replaceEntity('TwitchLoyalty', item, (error, result, response) => {
                    let res = {
                        statusCode: error ? 400 : 204,
                        body: null
                    };
                    context.done(null, res);
                });
                responseBody = "Points added";
            }

            context.res = {
                status: statusCode,
                body: responseBody
            };
        }
    }
    context.done();

    // context.bindings.outputLoyaltyTable = {};

    // let item =
    //     { PartitionKey: 'loyalty', RowKey: 'fetii1', points: 11 };
    // context.res = {
    //     body: inputLoyaltyTable
    // }

    // 
};