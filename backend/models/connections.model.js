import mongoose from "mongoose";    

const ConnectionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    connectedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: Boolean,
        default: null
    }
}, { timestamps: true });

const ConnectionRequest = mongoose.model("Connection", ConnectionSchema);

export default ConnectionRequest;
