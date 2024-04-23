import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    tinyUrl: {
        type: String,
        unique: true,
        required: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{ timestamp: { type: Number } }],
}, {timestamps: true})

const URL = mongoose.models.url || mongoose.model('url', urlSchema);

export default URL;