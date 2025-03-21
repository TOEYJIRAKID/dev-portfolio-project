// pages/api/photos.js

import { Photo } from "@/models/Photo";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  // if authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

  if (method === "GET") {
    if (req.query?.id) {
      // fetch a single proto by id
      const photo_single = await Photo.findById(req.query.id);
      res.json(photo_single);
    } else {
      // fetch all proto
      const protos = await Photo.find();
      res.json(protos.reverse());
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
