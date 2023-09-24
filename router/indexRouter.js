import { Router } from "express";
import pelisController from "../controllers/pelisController.js";
import tmdbController from "../controllers/tmdbController.js";

const indexRouter = Router()
const { addWatcheds, addWatched, addDiary, addDiaryData, addRatingData } = pelisController
const { addTmdbIds, getEmptyTmdbIds } = tmdbController

indexRouter.get('/', (req, res, next) => {
    res.send('Welcome to pelisApp Api!')
})
indexRouter.get('/watched', addWatched)
indexRouter.get('/watcheds', addWatcheds)
indexRouter.get('/diary', addDiary)
indexRouter.get('/diaries', addDiaryData)
indexRouter.get('/rating', addRatingData)

indexRouter.get('/tmdbids', addTmdbIds)
indexRouter.get('/emptyids', getEmptyTmdbIds)

export default indexRouter