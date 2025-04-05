import axios from "axios";
import Head from "next/head";
import Spinner from "./Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownEditor from "react-markdown-editor-lite";

export default function Project({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  client: existingClient,
  projectcategory: existingProjectcategory,
  tags: existingTags,
  livepreview: existingLivepreview,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [client, setClient] = useState(existingClient || "");
  const [projectcategory, setProjectcategory] = useState(
    existingProjectcategory || []
  );
  const [tags, setTags] = useState(existingTags || []);
  const [livepreview, setLivepreview] = useState(existingLivepreview || "");
  const [status, setStatus] = useState(existingStatus || "");

  // for images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createProject(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = {
      title,
      slug,
      images,
      description,
      client,
      projectcategory,
      tags,
      livepreview,
      status,
    };

    if (_id) {
      await axios.put("/api/projects", { ...data, _id });
      toast.success("Data Updated");
    } else {
      await axios.post("/api/projects", data);
      toast.success("Project Created");
    }

    setRedirect(true);
  }

  async function uploadImages(ev) {
    const files = ev.target?.files;

    if (files?.length > 0) {
      setIsUploading(true);

      for (const file of files) {
        const data = new FormData();
        data.append("file", file);

        // use the axios.post method and push the promise to the queue
        uploadImagesQueue.push(
          axios.post("/api/upload", data).then((res) => {
            setImages((oldImage) => [...oldImage, ...res.data.links]);
          })
        );
      }

      // wait for all images to finish uploading
      await Promise.all(uploadImagesQueue);
      setIsUploading(false);
      toast.success("Images Uploaded");
    } else {
      toast.error("An error occurred!");
    }
  }

  if (redirect) {
    router.push("/projects");
    return null;
  }

  function updateImagesOrder(images) {
    setImages(images);
  }

  function handleDeleteImage(index) {
    const updateImages = [...images];
    updateImages.splice(index, 1);
    setImages(updateImages);
    toast.success("Image Deleted Successfully");
  }

  // for slug url
  const handleSlugChange = (ev) => {
    const inputValue = ev.target.value;
    const newSlug = inputValue.replace(/\s+/g, "-"); // replace space with hyphens

    setSlug(newSlug);
  };

  return (
    <>
      <Head>
        <title>Add Project</title>
      </Head>
      <form className="addWebsiteform" onSubmit={createProject}>
        {/*project title*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter small title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        {/*project slug url*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="slug">Slug (seo friendly url)</label>
          <input
            type="text"
            id="slug"
            placeholder="Enter Slug url"
            value={slug}
            onChange={handleSlugChange}
          />
        </div>

        {/*project client name*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="client">Client Name</label>
          <input
            type="text"
            id="client"
            placeholder="Enter Client Name"
            value={client}
            onChange={(ev) => setClient(ev.target.value)}
          />
        </div>

        {/*project live preview*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="livepreview">Live Preview</label>
          <input
            type="text"
            id="livepreview"
            placeholder="Enter Live Preview Url"
            value={livepreview}
            onChange={(ev) => setLivepreview(ev.target.value)}
          />
        </div>

        {/*project category*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select Category (for multi select press ctrl + mouse left key){" "}
          </label>
          <select
            onChange={(e) =>
              setProjectcategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={projectcategory}
            name="category"
            id="category"
            multiple
          >
            {/* <option value="">Select Category</option> */}
            <option value="Web Development">Web Development</option>
            <option value="App Development">App Development</option>
            <option value="Game Development">Game Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Cyber Security">Cyber Security</option>
            <option value="Internet of Things">Internet of Things</option>
          </select>
        </div>

        {/*project images*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <div className="w-100">
            <label htmlFor="images">
              Images (first image will be show as thumbnail, you can drag)
            </label>
            <input
              type="file"
              id="fileInput"
              className="mt-1"
              accept="image/*"
              multiple
              onChange={uploadImages}
            />
          </div>
          <div className="w-100 flex flex-left mt-1">
            {isUploading && <Spinner />}
          </div>
        </div>

        {/* image preview and image sortable with delete image*/}
        {!isUploading && (
          <div className="flex">
            <ReactSortable
              list={Array.isArray(images) ? images : []}
              setList={updateImagesOrder}
              animation={200}
              className="flex gap-1"
            >
              {images?.map((link, index) => (
                <div key={link} className="uploadedimg">
                  <img src={link} alt="image" className="object-cover" />
                  <div className="deleteimg">
                    <button onClick={() => handleDeleteImage(index)}>
                      <MdDeleteForever />
                    </button>
                  </div>
                </div>
              ))}
            </ReactSortable>
          </div>
        )}

        {/* markdown description */}
        <div className="description w-100 flex flex-col flex-left mb-2">
          <label htmlFor="description">
            Project Content (for image: first upload and copy link and paste in
            ![alt text](link))
          </label>
          <MarkdownEditor
            value={description}
            onChange={(ev) => setDescription(ev.text)}
            style={{ width: "100%", height: "400px" }} //can adjust the height as needed
            renderHTML={(text) => (
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    // for code
                    const match = /language-(\w+)/.exec(className || "");

                    if (inline) {
                      return <code>{children}</code>;
                    } else if (match) {
                      return (
                        <div style={{ position: "relative" }}>
                          <pre
                            style={{
                              padding: "0",
                              borderRadius: "5px",
                              overflowX: "auto",
                              whiteSpace: "pre-wrap",
                            }}
                            {...props}
                          >
                            <code>{children}</code>
                          </pre>
                          <button
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              zIndex: "1",
                            }}
                            onClick={() =>
                              navigator.clipboard.writeText(children)
                            }
                          >
                            copy code
                          </button>
                        </div>
                      );
                    } else {
                      return <code {...props}>{children}</code>;
                    }
                  },
                }}
              >
                {text}
              </ReactMarkdown>
            )}
          />
        </div>

        {/* tags */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="tags">Tags</label>
          <select
            onChange={(e) =>
              setTags(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={tags}
            name="tags"
            id="tags"
            multiple
          >
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="tailwind">Tailwind CSS</option>
            <option value="javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="reactjs">ReactJS</option>
            <option value="nextjs">NextJS</option>
            <option value="vuejs">VueJS</option>
            <option value="dart">Dart</option>
            <option value="flutter">Flutter</option>
            <option value="python">Python</option>
            <option value="django">Django</option>
            <option value="csharp">C#</option>
            <option value="java">Java</option>
            <option value="nodejs">NodeJS</option>
            <option value="expressjs">ExpressJS</option>
            <option value="flask">Flask</option>
            <option value="elasticsearch">ElasticSearch</option>
            <option value="apexcharts">Apexcharts</option>
            <option value="scikitlearn">Scikit Learn</option>
            <option value="php">PHP</option>
            <option value="git">Git</option>
            <option value="github">GitHub</option>
            <option value="programming">Programming Language</option>
            <option value="api">API</option>
            <option value="mongodb">MongoDB</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="jsonserver">Json Server</option>
            <option value="oracle">Oracle</option>
            <option value="database">Database</option>
            <option value="docker">Docker</option>
            <option value="firebase">Firebase</option>
            <option value="vercel">Vercel</option>
            <option value="deployment">Deployment</option>
            <option value="linux">Linux</option>
            <option value="ubuntu">Ubuntu</option>
            <option value="kalilinux">Kali Linux</option>
            <option value="commandline">Command Line</option>
            <option value="cloud">Cloud</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="uiux">UX/UI</option>
            <option value="mobileapp">Mobile App</option>
            <option value="websecurity">Web Security</option>
            <option value="cybersecurity">Cyber Security</option>
            <option value="machinelearning">Machine Learning</option>
            <option value="deeplearning">Deep Learning</option>
            <option value="microservices">Microservices</option>
            <option value="iot">Internet of Things</option>
            <option value="malware">Malware</option>
            <option value="pefile">PE File</option>
            <option value="linenotify">LINE Notify</option>
            <option value="rfid">RFID</option>
          </select>
        </div>

        {/* project status */}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="status">Status</label>
          <select
            onChange={(ev) => setStatus(ev.target.value)}
            value={status}
            name="status"
            id="status"
          >
            <option value="">No select</option>
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>

        <div className="w-100 mb-1">
          <button type="submit" className="w-100 addwebbtn flex-center">
            SAVE PROJECT
          </button>
        </div>
      </form>
    </>
  );
}
