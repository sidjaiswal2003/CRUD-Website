import { getUser ,getCards, addCards, updateCard, deleteCard} from "../controllers/crud.js";
import { verifiedToken } from "../middleware/auth.js";
import express  from "express";
const router=express.Router()
router.get('/getuser',verifiedToken,getUser)
router.get('/getcard',verifiedToken,getCards)
router.post('/addcard',verifiedToken,addCards)
router.put('/updatecard/:id',verifiedToken,updateCard)
router.delete('/deletecard/:id',verifiedToken,deleteCard)

export default router