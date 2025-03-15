const { Schema, models, model } = require("mongoose");

const ProductSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    afilink: { type: String },
    price: { type: String }, // Can use Number if you want to do calculations
    status: { type: String },
}, {
    timestamps: true, // automatically manage createdAt and updatedAt
});

export const Shop = models.Shop || model('Shop', ProductSchema, 'shops');