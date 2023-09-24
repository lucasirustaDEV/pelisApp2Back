import { Schema, model, Types } from "mongoose";

const collection = "watcheds"

const watchedSchema = Schema({
    date: { type: Date },
    name: { type: String },
    year: { type: Number },
    lbx_uri: { type: String },
    rating: { type: Number },
    watched_date: { type: [Date] },
}, {
    timestamps: true,
})

const Watched = model(collection, watchedSchema)

export default Watched