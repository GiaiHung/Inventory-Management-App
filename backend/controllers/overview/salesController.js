const sendError = require("../../utils/sendError")
const OverallStat = require('../../models/OverallStat') 

const salesController = async (req, res) => {
    try {
        const stats = await OverallStat.find()
        res.status(200).json(stats[0])
    } catch (error) {
        sendError(res, 400, error.message)
    }
}

module.exports = {salesController}