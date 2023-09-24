import watched from "../data/watched.js"
import diary from "../data/diary.js"
import rating from "../data/rating.js"
import watchedModel from "../models/Watched.js"

const pelisController = {
    addWatcheds: async (req, res, next) => {
        let countWatched = 0
        let success = true
        try {
            console.log("Watched JSON: " + watched.length)
            for (const movie of watched) {
                const transformedData = {
                    date: movie.Date,
                    name: movie.Name,
                    year: movie.Year,
                    lbx_uri: movie.Lbx_URI
                }
                const newRecord = await watchedModel.create(transformedData)
                countWatched ++
            }
            console.log("Watched DB: " + countWatched)
            res.json({
                response: countWatched,
                success: true,
            });
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: "Error al agregar registros a la base de datos",
            })
        }  
    },
    addDiaryData: async (req, res, next) => {
        let countAdd = 0
        let success = true
        try {
            console.log("Diary JSON: " + diary.length)
            for (const movie of watched) {
                const transformedData = {
                    date: movie.Date,
                    name: movie.Name,
                    year: movie.Year,
                    lbx_uri: movie.Lbx_URI
                }
                const newRecord = await watchedModel.create(transformedData)
                countAdd ++
            }
            console.log("Add to DB: " + countAdd)
            res.json({
                response: countAdd,
                success: true,
            });
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: "Error al agregar registros a la base de datos",
            })
        }  
    },

    addWatched: async (req, res, next) => {
        let newWatched
        let success = true
        try {
            newWatched = await watchedModel.create(req.body)
            res.json({
                response: newWatched,
                success,
            })  
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: "Error al agregar registros a la base de datos",
            })
        }  
    },
    addDiary: async (req, res, next) => {
        let countAdd = 0
        let success = true
        try {
            const transformedData = {
                name: req.body.Name,
                year: req.body.Year,
                rating: req.body.Rating,
                watched_date: req.body["Watched Date"]
            }
            const findWatched = await watchedModel.findOne({ name: transformedData.name, year: transformedData.year })
            if(findWatched){
                findWatched.rating = transformedData.rating
                findWatched.watched_date.push(transformedData.watched_date)
                const addDiary = await findWatched.save()
            }
            res.json({
                response: findWatched,
                success,
            })  
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: "Error al agregar registros a la base de datos",
            })
        }  
    }
}

export default pelisController