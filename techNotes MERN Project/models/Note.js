const {
    Schema,
    Types: { ObjectId },
    model,
    default: mongoose,
} = require('mongoose');

const noteSchema = new Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model('Note', noteSchema);
