import express from 'express'
import { createContact, getAllContacts } from '../controllers/contactcontroller.js'
import {protect,authorize} from "../middlewares/authmiddleware.js"

const contactRouter=express.Router()

contactRouter.post("/",createContact)
contactRouter.get("/",protect ,authorize("admin"),getAllContacts)

export default contactRouter;