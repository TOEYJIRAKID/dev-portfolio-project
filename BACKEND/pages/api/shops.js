import { Shop } from "@/models/Shop";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {

    // if authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;

    if (method === 'POST') {
        const { title, slug, images, description, tags, afilink, price, status } = req.body;

        const blogDoc = await Shop.create({
            title, slug, images, description, tags, afilink, price, status
        })

        res.json(blogDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Shop.findById(req.query.id))
        } else {
            res.json((await Shop.find()).reverse())
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, description, tags, afilink, price, status } = req.body;

        await Shop.updateOne({ _id }, {
            title, slug, images, description, tags, afilink, price, status
        });

        res.json(true)
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Shop.deleteOne({ _id: req.query?.id })
            res.json(true)
        }
    }
}