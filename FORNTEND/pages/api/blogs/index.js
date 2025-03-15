import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export default async function handle(req, res) {

    // if authenticated, connect to mongoDB
    await mongooseConnect();

    const { method } = req;

    if (method === 'GET') {
        if (req.query?.id) {
            // fetch a single Blog by id
            const blogSingle = await Blog.findById(req.query.id);
            res.json(blogSingle);
        } else if (req.query?.blogcategory) {
            // fetch Blog by category
            const blogsCate = await Blog.find({ blogcategory: req.query.blogcategory });
            res.json(blogsCate);
        } else if (req.query?.tags) {
            // fetch Blog by tags
            const blogsCate = await Blog.find({ tags: req.query.tags });
            res.json(blogsCate);
        } else if (req.query?.slug) {
            // fetch Blog by slug
            const blogSlug = await Blog.find({ slug: req.query.slug });
            res.json(blogSlug.reverse());
        } else {
            // fetch all Blog
            const blogs = await Blog.find();
            res.json(blogs.reverse());
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}