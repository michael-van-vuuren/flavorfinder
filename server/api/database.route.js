import express from "express"
import DatabaseCtrl from "./database.controller.js"

const router = express.Router()

// create new user
router.route("/new").post(DatabaseCtrl.apiAddUser)
// get, update, delete items from user's pantry
router.route("/:id")
  .get(DatabaseCtrl.apiGetPantry)
  .put(DatabaseCtrl.apiUpdatePantry)
  .delete(DatabaseCtrl.apiDeletePantryItem)

export default router