import Link from "next/link";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { SiBloglovin } from "react-icons/si";
import useFetchData from "@/hooks/useFetchData";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Dataloading from "@/components/Dataloading";
import LoginLayout from "@/components/LoginLayout";

export default function Blogs() {

    // pagination
    const [currentPage, setCurrentPage] = useState(1); // for page 1
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState('');

    // fetch blog data
    const { alldata, loading } = useFetchData('/api/blogs');

    // function to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    // total number of blogs
    const allblog = alldata.length;

    // filter all data based on search query
    const filteredBlogs = searchQuery.trim() === '' ? alldata : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // calculate index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    // Get the current pag's blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const publishedblogs = currentBlogs.filter(ab => ab.status === 'publish');
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
        <LoginLayout>
            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>All Published <span>Blogs</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <SiBloglovin /><span>/</span><span>Blogs</span>
                    </div>
                </div>
                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search Blogs:</h2>
                        <input value={searchQuery} onChange={ev => setSearchQuery(ev.target.value)} type="text" placeholder="Search by title..." />
                    </div>
                    <table className="table table-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <>
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            </> : <>
                                {publishedblogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Blogs Found</td>
                                    </tr>
                                ) : (
                                    publishedblogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstBlog + index + 1}</td>
                                            <td><img src={blog.images[0]} width={180} alt="image" /></td>
                                            <td><h3>{blog.title}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/blogs/edit/' + blog._id}>
                                                        <button>
                                                            <FaEdit />
                                                        </button>
                                                    </Link>
                                                    <Link href={'/blogs/delete/' + blog._id}>
                                                        <button>
                                                            <RiDeleteBin6Fill />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </>}
                        </tbody>
                    </table>
                    {/* for pagination */}
                    {publishedblogs.length === 0 ? ("") : (
                        <div className="blogpagination">
                            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                            {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => (
                                <button key={number} onClick={() => paginate(number)} className={`${currentPage === number ? 'active' : ''}`}>
                                    {number}
                                </button>
                            ))}
                            <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
                    )}
                </div>
            </div>
        </LoginLayout>
    </>
}