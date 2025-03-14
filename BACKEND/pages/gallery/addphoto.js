import Photo from "@/components/photo";
import { SiBloglovin } from "react-icons/si";
import LoginLayout from "@/components/LoginLayout";

export default function addphoto() {

    return <>
        <LoginLayout>
            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Add <span>Photo</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <SiBloglovin /><span>/</span><span>Add Photo</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Photo />
                </div>
            </div>
        </LoginLayout>
    </>

}