import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";
import { FaPhoneVolume, FaTwitter } from "react-icons/fa6";

export default function contact() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [project, setProject] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [messageOk, setMessageOk] = useState("");

  async function createProduct(ev) {
    ev.preventDefault();

    setMessageOk("Sending...");

    const data = {
      fname,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description,
    };

    try {
      await axios.post("/api/contacts", data);
      setMessageOk("✅ Message sent successfully");

      // reset all form fields after successful submission
      setFname("");
      setLname("");
      setEmail("");
      setCompany("");
      setPhone("");
      setCountry("");
      setProject("");
      setPrice("");
      setDescription("");
    } catch (error) {
      if (error.response) {
        // the req was made and the server res with a status code
        // the falls out of the range of 2xx
        console.error("Server error", error.response.data);
      } else if (error.request) {
        // the req was made but no res was received
        console.error("Network error", error.request);
      } else {
        // something happened in setting up the req that triggered an error
        console.error("Error", error.message);
      }
      setMessageOk("❌ Failed to send message");
    }
  }

  const handleProjectChange = (projectName) => {
    if (project.includes(projectName)) {
      setProject(project.filter((project) => project !== projectName));
    } else {
      setProject([...project, projectName]);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Contact Us | PORTFOLIO</title>
        <meta
          name="description"
          content="Jirakit Aiadhet - Personal Portfolio"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="contactpage">
        <div className="container">
          <div className="contactformp">
            <div className="leftcontp">
              <h2>Get in touch</h2>
              <h2>Let's talk about your project</h2>
              <p>
                Thinking about a new project, a problem to solve, or just want
                to connect? Let's do it!
              </p>
              <p>Use the form on this page or get in touch by other means.</p>
              <p>
                We love questions and feedback - and we're always happy to help!
              </p>
              <div className="leftsociinfo">
                <ul>
                  <li>
                    <FaPhoneVolume />{" "}
                    <span>
                      Phone:{" "}
                      <a href="tel:+123456789" target="_blank">
                        +91-123456789
                      </a>
                    </span>
                  </li>
                  <li>
                    <MdAttachEmail />{" "}
                    <span>
                      Email:{" "}
                      <a href="mailto:jirakid2002@gmail.com" target="_blank">
                        jirakid2002@gmail.com
                      </a>
                    </span>
                  </li>
                  <li>
                    <GrLinkedin />{" "}
                    <span>
                      Linkedin:{" "}
                      <a href="tel:+123456789" target="_blank">
                        +91-123456789
                      </a>
                    </span>
                  </li>
                  <li>
                    <FaTwitter />{" "}
                    <span>
                      Twitter:{" "}
                      <a href="tel:+123456789" target="_blank">
                        @canyoucallinamo
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rightcontp">
              <form onSubmit={createProduct}>
                <div className="rightconttitle">
                  <h2>Your Contact Information</h2>
                </div>
                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={fname}
                    onChange={(ev) => setFname(ev.target.value)}
                    placeholder="First name"
                    required
                  />
                  <input
                    type="text"
                    value={lname}
                    onChange={(ev) => setLname(ev.target.value)}
                    placeholder="Last name"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="Email address"
                    required
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(ev) => setCompany(ev.target.value)}
                    placeholder="Company name"
                    required
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    placeholder="Phone number"
                    required
                  />
                  <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="malaysia">Malaysia</option>
                    <option value="singapore">Singapore</option>
                    <option value="thailand">Thailand</option>
                    <option value="vietnam">Vietnam</option>
                    <option value="china">China</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="india">India</option>
                    <option value="italy">Italy</option>
                    <option value="japan">Japan</option>
                    <option value="russia">Russia</option>
                    <option value="south-korea">South Korea</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                  </select>
                </div>
                <div className="rightconttitle">
                  <h2>What services do you need for your project?</h2>
                </div>
                <div className="rightcontcheckbox">
                  {[
                    "Website Development",
                    "App Development",
                    "Design System",
                    "Website Migration",
                    "E-commerce Site",
                    "Performance Evaluation",
                  ].map((projectOption) => (
                    <label
                      key={projectOption}
                      className="cyberpunk-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        className="cyberpunk-checkbox"
                        value={projectOption}
                        checked={project.includes(projectOption)}
                        onChange={() => handleProjectChange(projectOption)}
                      />
                      {projectOption}
                    </label>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>
                    How much is the anticipated budget for your next project?
                  </h2>
                </div>
                <div className="rightcontredio">
                  {[
                    "Less than $400",
                    "$400 - $800",
                    "$800 - $1000",
                    "More than $1000",
                  ].map((priceRange) => (
                    <div key={priceRange} className="radio-button">
                      <input
                        type="radio"
                        id={priceRange}
                        name="example-radio"
                        value={priceRange}
                        checked={price === priceRange}
                        onChange={handlePriceChange}
                        required
                      />
                      <span className="radio"></span>
                      <label htmlFor={priceRange}>{priceRange}</label>
                    </div>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>Tell me about your project</h2>
                </div>
                <div className="rightcontpera">
                  <textarea
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                    name="description"
                    rows={4}
                    id=""
                    placeholder="Project description"
                    required
                  ></textarea>
                </div>
                <hr />
                <div className="rightcontsbtn flex gap-2">
                  <button type="submit">Submit</button>
                  <p>{messageOk}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
