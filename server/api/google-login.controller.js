import GoogleLoginDAO from '../dao/google-loginDAO.js'

/**
 * Controller class for Google Login functionality.
 * @class GoogleLoginController
 */
class GoogleLoginController {
  /**
   * Retrieve the Google client ID.
   *
   * @static
   * @async
   * @function
   * @param {string|Error} res - Google clientid.
   * @returns Returns null if Google clientid not found.
   */
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

export default GoogleLoginController