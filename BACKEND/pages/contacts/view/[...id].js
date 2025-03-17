import axios from "axios";
import Head from "next/head"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { SiBloglovin } from "react-icons/si";

export default function Contactview() {

    const router = useRouter();

    const { id } = router.query;

    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/contacts?id=' + id).then(response => {
                setContactInfo(response.data)
            })
        }
    }, [id])

    const createdAtDate = contactInfo && contactInfo?.createdAt ? new Date(contactInfo && contactInfo?.createdAt) : null;

    // function to format the date as '23 may 2025 10:10 pm'
    const formatDate = (date) => {
        // check if date if valid
        if (!date || isNaN(date)) {
            return ''; // or handle the error as needed
        }

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour12: true // use 12-hour format
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    // Function to handle empty or null values
    const displayValue = (value) => {
        return value ? value : 'N/A';
    };

    return <>
        <Head>
            <title>Contact Detail</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Detail <span>{contactInfo?.company}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin /><span>/</span><span>Contact Detail</span>
                </div>
            </div>
            <div className="mt-3">
                {/* Contact Card */}
                <div className="contact-card">
                    <div className="card-header">
                        <h2>
                            {contactInfo?.fname} {contactInfo?.lname}
                        </h2>
                    </div>
                    <div className="card-body">
                        <div className="info-row">
                            <span className="card_label">Email:</span>
                            <span className="card_value">{contactInfo?.email}</span>
                        </div>
                        <div className="info-row">
                            <span className="card_label">Phone:</span>
                            <span className="card_value">{contactInfo?.phone}</span>
                        </div>
                        <div className="info-row">
                            <span className="card_label">Company:</span>
                            <span className="card_value">{contactInfo?.company}</span>
                        </div>
                        <div className="info-row">
                            <span className="card_label">Country:</span>
                            <span className="card_value">{contactInfo?.country}</span>
                        </div>
                        {contactInfo?.project && contactInfo?.project.length > 0 && (
                            <div className="info-row">
                                <span className="card_label">Project(s):</span>
                                <ul className="card_value">
                                    {contactInfo?.project.map((proj, index) => (
                                        <li key={index}>{proj}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="info-row">
                            <span className="card_label">Price:</span>
                            <span className="card_value">{contactInfo?.price || "N/A"}</span>
                        </div>
                        {contactInfo?.description && (
                            <div className="info-row">
                                <span className="card_label">Description:</span>
                                <span className="card_value">{contactInfo?.description}</span>
                            </div>
                        )}
                        <div className="info-row">
                            <span className="card_label">Created At:</span>
                            <span className="card_value">{formatDate(createdAtDate)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>

}