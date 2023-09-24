import watchedModel from "../models/Watched.js"
import axios from "axios"

const tmdbController = {
    addTmdbIds: async (req, res, next) => {
        try {
            let countError = 0
            let countSave = 0
            let countMovie = 0
            let success = true
            const totalMovies = await watchedModel.countDocuments()
            console.log("Cantidad de Registros: " + totalMovies)
            let skip = 0
            let limit = 10
            while (skip < totalMovies) {
                const pageMovies = await watchedModel.find().skip(skip).limit(limit) 
                skip += limit
                for (const movie of pageMovies) {
                    const tmdbMovie = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.TMDB_KEY +'&query=' + movie.name + '&primary_release_year=' + movie.year)
                    countMovie ++
                    if(tmdbMovie.data.total_results > 0){
                        console.log("Cantidad de Resultados para " + movie.name + " ID " + tmdbMovie.data.results[0].id + ": " + tmdbMovie.data.results.length + "(Película Nro. " + countMovie + ")")
                        if(!movie.tmdb_id){
                            movie.tmdb_id = tmdbMovie.data.results[0].id
                            for (const result of tmdbMovie.data.results) {
                                movie.tmdb_ids.push(result.id)
                            }
                            const addTmdbIds = await movie.save()
                            countSave ++
                        }
                    } else {
                        countError ++
                    }
                }
            }
            console.log("Errores: " + countError)
            console.log("Actualizaciones: " + countSave)
            res.json({
                response: countSave,
                success: true,
            })
        } catch (err) {
            console.error(err)
            res.status(500).json({
                success: false,
                message: "Error al agregar registros a la base de datos",
            })
        }  
    },

    getEmptyTmdbIds: async (req, res, next) => {
        try {
            let countError = 0
            let countSave = 0
            let countMovie = 0
            const findMovies = await watchedModel.find({ tmdb_id: { $in: ["", null] } })
            console.log("Películas sin ID: " + findMovies.length)
            for (const movie of findMovies){
                const tmdbMovie = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + process.env.TMDB_KEY +'&query=' + movie.name + '&include_adult=true')    
                countMovie ++
                if(tmdbMovie.data.total_results > 0){
                    console.log("Cantidad de Resultados para " + movie.name + " ID " + tmdbMovie.data.results[0].id + ": " + tmdbMovie.data.results.length + "(Película Nro. " + countMovie + ")")
                    if(!movie.tmdb_id){
                        movie.tmdb_id = tmdbMovie.data.results[0].id
                        for (const result of tmdbMovie.data.results) {
                            movie.tmdb_ids.push(result.id)
                        }
                        const addTmdbIds = await movie.save()
                        countSave ++
                    }
                } else {
                    countError ++
                }
            }
            console.log("Errores: " + countError)
            console.log("Actualizaciones: " + countSave)
            res.json({
                response: findMovies,
                //response: countSave,
                success: true,
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

export default tmdbController