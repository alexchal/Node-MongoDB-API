import { Schema, Document, model } from "mongoose";

type ProductType = Document & {
    _id: string;
    name: string;
    price: number;
    productImage: string;
};

const productSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true }
});

export const Product = model<ProductType>("Product", productSchema);
