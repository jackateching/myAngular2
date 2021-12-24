const dbo = require("../db/conn");
const { ObjectId } = require('mongodb');

module.exports = {
     getLog: async function(req, res){
        try {
            let dbConnect = dbo.getDb();
            const PAGE_SIZE = 5;
            const page = parseInt(req.query.page);
            const skip = (page - 1) * PAGE_SIZE;
            // console.log(page, skip);
            if (isNaN(page) || page === 0) {
                return res.status(500).json("please provide a valid page number");
            } 
            dbConnect
                .collection('logs')
                .find({})
                .skip(skip)
                .limit(PAGE_SIZE)
                .toArray(async function(err, result){
                    if (err) return res.status(500).json(err);
                    const totalItems = await getLogTotalPage();
                    return res.status(200).json({
                        logs: result,
                        page: page,
                        totalItems: totalItems,
                        pageSize: PAGE_SIZE
                    });
                    
                });
        } catch(e) {
            return res.status(500).json(e);
        }
        
    }
}

async function getLogTotalPage() {
    let dbConnect = dbo.getDb();
    return dbConnect
            .collection('logs')
            .count({}).then(res => {
                return res})
}
