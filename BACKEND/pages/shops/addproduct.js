import Shop from "@/components/Shop";
import { SiBloglovin } from "react-icons/si";
import LoginLayout from "@/components/LoginLayout";

export default function Addproduct() {

    return <>
        <LoginLayout>
            <div className="addblogspage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Add <span>Product</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <SiBloglovin /><span>/</span><span>Add Product</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Shop />
                </div>
            </div>
        </LoginLayout>
    </>
}