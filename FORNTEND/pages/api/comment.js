import { Comment } from "@/models/Comment";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {

    // if authenticated, connect to mongoDB
    await mongooseConnect();

    const { method } = req;

    if (method === 'POST') {
        try {

            const { name, email, title, contentpera, parent } = req.body;

            let commentDoc;

            if (parent) {
                // if parent comment ID is provided, create a child comment
                commentDoc = await Comment.create({
                    name,
                    email,
                    title,
                    contentpera,
                    parent: parent
                });

                // update parent comment's children array
                await Comment.findByIdAndUpdate(parent, {
                    $push: { children: commentDoc._id }
                });

            } else {
                // otherwise, create a root comment
                commentDoc = await Comment.create({
                    name, email, title, contentpera
                });
            }

            res.status(201).json(commentDoc); // res with 201 created status

        } catch (error) {
            console.error('Error Creating Comment:', error);
            res.status(500).json({ error: 'Failed to create comment' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}
