// pages/api/contact.js

import { Contact } from "@/models/contact";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  // if authenticated, connect to mongoDB
  await mongooseConnect();

  const { method } = req;

  if (method === "POST") {
    try {
      const {
        fname,
        lname,
        email,
        company,
        phone,
        country,
        project,
        price,
        description,
      } = req.body;

      const contactDoc = await Contact.create({
        fname,
        lname,
        email,
        company,
        phone,
        country,
        project,
        price,
        description,
      });

      res.status(201).json(contactDoc); // res 201 for create success
    } catch (error) {
      console.error("error create contact", error);
      res.status(500).json({ error: "failed to create contact" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
