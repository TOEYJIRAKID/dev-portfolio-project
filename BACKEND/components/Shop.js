import axios from 'axios';
import Head from "next/head";
import Spinner from './Spinner';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from "react-icons/md";
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownEditor from 'react-markdown-editor-lite';

export default function Shop(
    {
        _id,
        title: existingTitle,
        slug: existingSlug,
        images: existingImages,
        description: existingDescription,
        tags: existingTags,
        afilink: existingAfilink,
        price: existingPrice,
        status: existingStatus,
    }
) {

    const [redirect, setRedirect] = useState(false);

    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
    const [description, setDescription] = useState(existingDescription || '');
    const [tags, setTags] = useState(existingTags || []);
    const [afilink, setAfilink] = useState(existingAfilink || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [status, setStatus] = useState(existingStatus || '');

    // for images uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue = [];

    async function createProject(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImagesQueue)
        }

        const data = { title, slug, images, description, tags, afilink, price, status };

        if (_id) {
            await axios.put('/api/shops', { ...data, _id })
            toast.success('Data Updated')
        } else {
            await axios.post('/api/shops', data)
            toast.success('Product Created')
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;

        if (files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                // use the axios.post method and push the promise to the queue
                uploadImagesQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setImages(oldImage => [...oldImage, ...res.data.links])
                    })
                )
            }

            // wait for all images to finish uploading
            await Promise.all(uploadImagesQueue);
            setIsUploading(false);
            toast.success('Images Uploaded')

        } else {
            toast.error('An error occurred!')
        }
    }

    if (redirect) {
        router.push('/shops')
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images)
    }

    function handleDeleteImage(index) {
        const updateImages = [...images];
        updateImages.splice(index, 1);
        setImages(updateImages);
        toast.success('Image Deleted Successfully')
    }

    // for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-') // replace space with hyphens

        setSlug(newSlug);
    }

    return <>
        <Head>
            <title>Add Product</title>
        </Head>
        <form className="addWebsiteform" onSubmit={createProject}>
            {/*product title*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input type="text"
                    id="title"
                    placeholder="Enter small title"
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>

            {/*product slug url*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="slug">Slug (seo friendly url)</label>
                <input type="text"
                    id="slug"
                    placeholder="Enter Slug url"
                    value={slug}
                    onChange={handleSlugChange}
                />
            </div>

            {/*product Affiliate Link*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="afilink">Affiliate Link</label>
                <input type="text"
                    id="afilink"
                    placeholder="Enter Affiliate Link"
                    value={afilink}
                    onChange={ev => setAfilink(ev.target.value)}
                />
            </div>

            {/*product price*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="pric">Price</label>
                <input type="text"
                    id="price"
                    placeholder="Enter Price"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)}
                />
            </div>

            {/*product images*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="images">Images (first image will be show as thumbnail, you can drag)</label>
                    <input type="file" id="fileInput" className="mt-1" accept="image/*" multiple
                        onChange={uploadImages} />
                </div>
                <div className="w-100 flex flex-left mt-1">
                    {isUploading && (<Spinner />)}
                </div>
            </div>

            {/* image preview and image sortable with delete image*/}
            {!isUploading && (
                <div className="flex">
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200}
                        className="flex gap-1">
                        {images?.map((link, index) => (
                            <div key={link} className="uploadedimg">
                                <img src={link} alt="image" className="object-cover" />
                                <div className="deleteimg">
                                    <button onClick={() => handleDeleteImage(index)}><MdDeleteForever /></button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}

            {/* markdown description */}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description">Product Content (for image: first upload and copy link and paste in ![alt text](link))</label>
                <MarkdownEditor
                    value={description}
                    onChange={(ev) => setDescription(ev.text)}
                    style={{ width: '100%', height: '400px' }} //can adjust the height as needed 
                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {

                                // for code
                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return <code>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                copy code
                                            </button>
                                        </div>
                                    )
                                } else {
                                    return <code {...props}>{children}</code>
                                }
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>

            {/* tags (can change tag) */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="tags">Tags</label>
                <select onChange={(e) => setTags(Array.from(e.target.selectedOptions, option => option.value))}
                    value={tags} name="tags" id="tags" multiple>
                    <option value="html">html</option>
                    <option value="css">css</option>
                    <option value="javascript">javascript</option>
                    <option value="nextjs">nextjs</option>
                    <option value="reactjs">reactjs</option>
                    <option value="database">database</option>
                </select>
            </div>

            {/* product status */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="status">Status</label>
                <select onChange={ev => setStatus(ev.target.value)} value={status} name="status" id="status">
                    <option value="">No select</option>
                    <option value="draft">Draft</option>
                    <option value="publish">Publish</option>
                </select>
            </div>

            <div className="w-100 mb-1">
                <button type="submit" className="w-100 addwebbtn flex-center">SAVE PRODUCT</button>
            </div>
        </form>
    </>
}

