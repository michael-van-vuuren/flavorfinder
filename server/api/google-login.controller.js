import GoogleLoginDAO from '../dao/google-loginDAO.js'

export default class GoogleLoginController {
    static async apiGetClientId(req, res, next) {
      try {
        let clientid = await GoogleLoginDAO.getClientId()
        if (!clientid) {
          res.status(404).json({ error: 'cannot find Google clientid' })
          return
        }
        res.json(clientid)
      } catch (e) {
        res.status(500).join({ error: e.message })
      }
    }

}