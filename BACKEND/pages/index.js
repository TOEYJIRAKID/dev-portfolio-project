import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import { IoHome } from "react-icons/io5";
import Loading from "@/components/Loading";
import { useState, useEffect } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

export default function Home() {

  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

  // use this on top for render error
  const [blogsData, setBlogsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [shopData, setShopsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // define option within the component scope
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Blogs Created Monthly by Year',
      },
    },
  }

  useEffect(() => {
    // fetch data from api
    const fetchData = async () => {
      try {

        const response = await fetch('/api/blogs');
        const responseProject = await fetch('/api/projects');
        const responseShop = await fetch('/api/shops');
        const responseGallery = await fetch('/api/photos');
        const data = await response.json();
        const dataProject = await responseProject.json();
        const dataShop = await responseShop.json();
        const dataGallery = await responseGallery.json();

        setBlogsData(data); // assuming data is an array of blog objects
        setProjectsData(dataProject);
        setShopsData(dataShop);
        setPhotosData(dataGallery);
        setLoading(false); // after fetching data, set loading to false

      } catch (error) {
        setLoading(false); // if error occurs, set loading to false
      }
    }

    fetchData(); // call fetchData function
  }, []);

  // Aggregated data by year and month
  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear(); // Get the year
    const month = new Date(blog.createdAt).getMonth(); // Get the month
    acc[year] = acc[year] || Array(12).fill(0); // Initialize array for the year if not exists
    acc[year][month]++; // Increment the count for the month
    return acc;
  }, {});

  const currentYear = new Date().getFullYear(); // get the current year
  const years = Object.keys(monthlyData); // get the years from the data
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0), // if no data for month, default to 0
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
  }));

  const data = {
    labels,
    datasets
  }

  return (

    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Admin <span>Dashboard</span></h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome /> <span>/</span><span>Dashboard</span>
          </div>
        </div>

        {/* dashboard four cards */}
        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>{blogsData.filter(dat => dat.status === "publish").length}</span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>{projectsData.filter(dat => dat.status === "publish").length}</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>{shopData.filter(dat => dat.status === "publish").length}</span>
          </div>
          <div className="four_card">
            <h2>Gallery Photos</h2>
            <span>{photosData.length}</span>
          </div>
        </div>

        {/* year overview */}
        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
              <h3 className="text-right">{blogsData.filter(dat => dat.status === "publish").length} / 365 <br /> <span>Total Published</span></h3>
            </div>
            <Bar data={data} options={options} />
          </div>

          <div className="right_salescont">
            <div>
              <h3>Blogs By Category</h3>
              <ul className="creative-dots">
                <li className="big-dot"></li>
                <li className="semi-big-dot"></li>
                <li className="medium-dot"></li>
                <li className="semi-medium-dot"></li>
                <li className="semi-small-dot"></li>
                <li className="small-dot"></li>
              </ul>
            </div>
            <div className="blogscategory flex flex-center">
              <table>
                <thead>
                  <tr>
                    <th>Topics</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Node JS</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Node JS")).length}</th>
                  </tr>
                  <tr>
                    <th>React JS</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("React JS")).length}</th>
                  </tr>
                  <tr>
                    <th>Next JS</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Next JS")).length}</th>
                  </tr>
                  <tr>
                    <th>Css</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Css")).length}</th>
                  </tr>
                  <tr>
                    <th>Digital Marketing</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Digital Marketing")).length}</th>
                  </tr>
                  <tr>
                    <th>Flutter Dev</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Flutter Dev")).length}</th>
                  </tr>
                  <tr>
                    <th>Database</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Database")).length}</th>
                  </tr>
                  <tr>
                    <th>Deployment</th>
                    <th>{blogsData.filter(dat => dat.blogcategory.includes("Deployment")).length}</th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>

  );

}
