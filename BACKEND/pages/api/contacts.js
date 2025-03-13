import { Contact } from "@/models/contact";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {

    // if authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;

    if (method === 'POST') {
        const { fname, lname, email, company, phone, country, price, description, project } = req.body;

        const blogDoc = await Contact.create({
            fname, lname, email, company, phone, country, price, description, project
        })

        res.json(blogDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Contact.findById(req.query.id))
        } else {
            res.json((await Contact.find()).reverse())
        }
    }

    if (method === 'PUT') {
        const { _id, fname, lname, email, company, phone, country, price, description, project } = req.body;

        await Contact.updateOne({ _id }, {
            fname, lname, email, company, phone, country, price, description, project
        });

        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Contact.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }
}