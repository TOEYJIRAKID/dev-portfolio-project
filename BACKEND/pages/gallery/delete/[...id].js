import axios from "axios";
import Head from "next/head"
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";

export default function DeletePhoto() {

    const router = useRouter();

    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/photos?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id]);

    function goBack() {
        router.push('/gallery');
    }

    async function deleteBlog() {
        await axios.delete('/api/photos?id=' + id)
        toast.success('Deleted Successfully!')
        goBack();
    }

    return <>
        <Head>
            <title>Delete Photo</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard /><span>/</span><span>Delete Photo</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh_100">
                <div className="deletecard">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M8 6v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14"></path>
                        <circle cx="18" cy="18" r="4" fill="red"></circle>
                        <path d="M18 16v2"></path>
                        <path d="M18 20h.01"></path>
                    </svg>
                    <p className="cookieHeading">Are you sure?</p>
                    <p className="cookieDescription">If you delete this website content it will be permanent delete your content.</p>
                    <div className="buttonContainer">
                        <button onClick={deleteBlog} className="acceptButton">Delete</button>
                        <button onClick={goBack} className="declineButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}