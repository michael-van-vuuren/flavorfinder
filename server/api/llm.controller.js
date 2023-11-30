

export default class LLMController {
    static async serverSendMessage(req, res, next) {
        try {
            const message = req.body.message

            res.json({ status: 'success' })
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }
}
