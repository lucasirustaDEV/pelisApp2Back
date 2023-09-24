import { Router } from "express";
import pelisController from "../controllers/pelisController.js";

const indexRouter = Router()
const { addWatcheds, addWatched, addDiary } = pelisController

indexRouter.get('/', (req, res, next) => {
    res.send('Welcome to pelisApp Api!')
})
indexRouter.get('/watched', addWatched)
indexRouter.get('/watcheds', addWatcheds)
indexRouter.get('/diary', addDiary)

export default indexRouter