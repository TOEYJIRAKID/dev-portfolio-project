import axios from "axios";
import Spinner from "./Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { ReactSortable } from "react-sortablejs";
import { MdDeleteForever } from "react-icons/md";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownEditor from "react-markdown-editor-lite";

export default function Blog({
  _id,
  title: existingTitle,
  slug: existingSlug,
  images: existingImages,
  description: existingDescription,
  blogcategory: existingBlogcategory,
  tags: existingTags,
  status: existingStatus,
}) {
  const [redirect, setRedirect] = useState(false);

  const router = useRouter();

  const [title, setTitle] = useState(existingTitle || "");
  const [slug, setSlug] = useState(existingSlug || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [blogcategory, setBlogcategory] = useState(existingBlogcategory || []);
  const [tags, setTags] = useState(existingTags || []);
  const [status, setStatus] = useState(existingStatus || "");

  // for images uploading
  const [isUploading, setIsUploading] = useState(false);
  const uploadImagesQueue = [];

  async function createBlog(ev) {
    ev.preventDefault();

    if (isUploading) {
      await Promise.all(uploadImagesQueue);
    }

    const data = {
      title,
      slug,
      images,
      description,
      blogcategory,
      tags,
      status,
    };

    if (_id) {
      await axios.put("/api/blogs", { ...data, _id });
      toast.success("Data Updated");
    } else {
      await axios.post("/api/blogs", data);
      toast.success("Blog Created");
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
    router.push("/blogs");
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
      <form className="addWebsiteform" onSubmit={createBlog}>
        {/*blog title*/}
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

        {/*blog slug url*/}
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

        {/*blog category*/}
        <div className="w-100 flex flex-col flex-left mb-2">
          <label htmlFor="category">
            Select Category (for multi select press ctrl + mouse left key){" "}
          </label>
          <select
            onChange={(e) =>
              setBlogcategory(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            value={blogcategory}
            name="category"
            id="category"
            multiple
          >
            {/* <option value="">Select Category</option> */}
            <option value="Web">Web Development</option>
            <option value="App">App Development</option>
            <option value="Game">Game Development</option>
            <option value="ML">Machine Learning & AI</option>
          </select>
        </div>

        {/*blog images*/}
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
            Blog Content (for image: first upload and copy link and paste in
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
            {/* Frontend */}
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="bootstrap">Bootstrap</option>
            <option value="tailwind">Tailwind CSS</option>
            <option value="javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="reactjs">ReactJS</option>
            <option value="nextjs">NextJS</option>
            <option value="vuejs">VueJS</option>
            <option value="svelte">Svelte</option>
            <option value="astro">Astro</option>
            <option value="framer-motion">Framer Motion</option>
            <option value="gsap">GSAP</option>
            <option value="threejs">Three.js</option>
            <option value="figma">Figma</option>
            <option value="frontend">Frontend</option>
            <option value="uiux">UX/UI</option>
            <option value="webrendering">Web Rendering</option>

            {/* Mobile */}
            <option value="flutter">Flutter</option>
            <option value="reactnative">React Native</option>
            <option value="kotlin">Kotlin</option>
            <option value="swift">Swift</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="jetpack-compose">Jetpack Compose</option>
            <option value="xamarin">Xamarin</option>
            <option value="cordova">Cordova</option>
            <option value="capacitor">Capacitor</option>
            <option value="appdevelopment">App Development</option>

            {/* Backend */}
            <option value="python">Python</option>
            <option value="django">Django</option>
            <option value="csharp">C#</option>
            <option value="java">Java</option>
            <option value="nodejs">NodeJS</option>
            <option value="expressjs">ExpressJS</option>
            <option value="php">PHP</option>
            <option value="springboot">Spring Boot</option>
            <option value="laravel">Laravel</option>
            <option value="aspnet">ASP.NET</option>
            <option value="fastapi">FastAPI</option>
            <option value="backend">Backend</option>
            <option value="api">API</option>
            <option value="microservices">Microservices</option>

            {/* Database */}
            <option value="mongodb">MongoDB</option>
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="oracle">Oracle</option>
            <option value="firebase">Firebase</option>
            <option value="database">Database</option>

            {/* DevOps / Tools */}
            <option value="git">Git</option>
            <option value="github">GitHub</option>
            <option value="docker">Docker</option>
            <option value="vercel">Vercel</option>
            <option value="deployment">Deployment</option>
            <option value="linux">Linux</option>
            <option value="ubuntu">Ubuntu</option>
            <option value="cloud">Cloud</option>
            <option value="ci">CI/CD</option>
            <option value="devops">DevOps</option>
            <option value="kubernetes">Kubernetes</option>
            <option value="ansible">Ansible</option>
            <option value="terraform">Terraform</option>
            <option value="nginx">Nginx</option>
            <option value="aws">AWS</option>
            <option value="gcp">GCP</option>
            <option value="azure">Azure</option>

            {/* Web Performance & SEO */}
            <option value="ssr">SSR</option>
            <option value="csr">CSR</option>
            <option value="seo">SEO</option>
            <option value="websecurity">Web Security</option>
            <option value="performance">Performance</option>

            {/* Development Categories */}
            <option value="programming">Programming Language</option>
            <option value="webdevelopment">Web Development</option>
            <option value="fullstack">Fullstack</option>

            {/* Machine Learning & AI */}
            <option value="machinelearning">Machine Learning</option>
            <option value="deeplearning">Deep Learning</option>
            <option value="ai">AI</option>
            <option value="computervision">Computer Vision</option>
            <option value="nlp">NLP</option>
            <option value="tensorflow">TensorFlow</option>
            <option value="pytorch">PyTorch</option>
            <option value="datascience">Data Science</option>
            <option value="modeltraining">Model Training</option>
            <option value="mlops">MLOps</option>
            <option value="opencv">OpenCV</option>
            <option value="scikit-learn">Scikit-learn</option>
            <option value="jupyter">Jupyter Notebook</option>
            <option value="huggingface">HuggingFace</option>
            <option value="generative-ai">Generative AI</option>
            <option value="chatgpt">ChatGPT</option>

            {/* Security */}
            <option value="jwt">JWT</option>
            <option value="oauth">OAuth</option>
            <option value="authentication">Authentication</option>
            <option value="authorization">Authorization</option>
            <option value="cryptography">Cryptography</option>

            {/* Testing */}
            <option value="testing">Testing</option>
            <option value="unit-testing">Unit Testing</option>
            <option value="integration-testing">Integration Testing</option>
            <option value="performance-testing">Performance Testing</option>
            <option value="jest">Jest</option>
            <option value="mocha">Mocha</option>
            <option value="cypress">Cypress</option>
            <option value="playwright">Playwright</option>
            <option value="selenium">Selenium</option>

            {/* Architecture / Patterns */}
            <option value="architecture">Architecture</option>
            <option value="designpatterns">Design Patterns</option>
            <option value="monolith">Monolith</option>
            <option value="event-driven">Event-Driven Architecture</option>
            <option value="ddd">Domain Driven Design</option>
            <option value="cqrs">CQRS</option>
            <option value="rest">REST</option>
            <option value="graphql">GraphQL</option>

            {/* Game Development */}
            <option value="unity">Unity</option>
            <option value="unreal">Unreal Engine</option>
            <option value="godot">Godot</option>
            <option value="gamedev">Game Development</option>
            <option value="game-design">Game Design</option>

            {/* Blockchain */}
            <option value="solidity">Solidity</option>
            <option value="web3">Web3</option>
            <option value="ethersjs">Ethers.js</option>
            <option value="smartcontract">Smart Contract</option>

            {/* Misc / Tools  */}
            <option value="vscode">VS Code</option>
            <option value="eslint">ESLint</option>
            <option value="prettier">Prettier</option>
            <option value="storybook">Storybook</option>
            <option value="postman">Postman</option>
            <option value="npm">NPM</option>
            <option value="yarn">Yarn</option>
            <option value="clean-code">Clean Code</option>
            <option value="refactoring">Refactoring</option>
            <option value="agile">Agile</option>
            <option value="scrum">Scrum</option>
            <option value="career">Career</option>
            <option value="freelance">Freelance</option>
            <option value="productivity">Productivity</option>
          </select>
        </div>

        {/* blog status */}
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
            SAVE BLOG
          </button>
        </div>
      </form>
    </>
  );
}
