const { Schema, models, model } = require("mongoose");

const ContactSchema = new Schema({
    fname: { type: String, required: true },
    lname: { type: String},
    email: { type: String, required: true },
    company: { type: String},
    phone: { type: String, required: true },
    country: { type: String},
    project: [{ type: String }],
    price: { type: String},
    description: { type: String},
}, {
    timestamps: true, // automatically manage createdAt and updatedAt
});

export const Contact = models.Contact || model('Contact', ContactSchema, 'contacts');