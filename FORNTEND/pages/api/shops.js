// pages/api/shops.js

import { Shop } from "@/models/Shop";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  // if authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // fetch a single shop by id
      const shop = await Shop.findById(req.query.id);
      res.json(shop);
    } else if (req.query?.slug) {
      // fetch shop by slug
      const shopslug = await Shop.find({ slug: req.query.slug });
      res.json(shopslug.reverse());
    } else {
      // fetch all shop
      const shops = await Shop.find();
      res.json(shops.reverse());
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
