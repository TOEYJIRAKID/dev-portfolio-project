import Head from "next/head";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";


export default function gallery() {

    const { alldata, loading } = useFetchData('/api/photos')


    return <>
        <Head>
            <title>Gallery Photos</title>
        </Head>
        <div className="gallerypage">
            <div className="container">
                <div className="gallerytopsec">
                    <div className="topphonesec">
                        <div className="lefttitlesec">
                            <h4>TOEYJIRA GALLARY PHOTOS</h4>
                            <h1>Personal <br /> Photography</h1>
                            <Link href='/gallery#galleryimages'><button>VIEW MORE</button></Link>
                        </div>
                        <div className="rightimgsec">
                            <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/3/1.jpg" alt="Photography_one" />
                            <div className="r_img_top">
                                <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/6.jpg" alt="Photography_two" />
                                <img src="https://wpthemebooster.com/demo/themeforest/html/kimono/assets/img/projects/1/5.jpg" alt="Photography_three" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="gallerybtmphotos" id="galleryimages">
                <div className="container">
                    <div className="gbtmtitles text-center">
                        <h3><span>01//</span>OUR PORTFOLIO</h3>
                        <h2>ToeyJira captures <span>All of Your</span><br />beautiful memories</h2>
                    </div>
                    <div className="gallery_image_grid">
                        {loading ? <Spinner /> : <>
                            {alldata.map((photo) => {
                                return <div className="image-item">
                                    <img src={photo.images[0]} alt="" />
                                    <div className="galeryimgiteminfo">
                                        <h2>{photo.title}</h2>
                                        <p>By ToeyJira</p>
                                    </div>
                                </div>
                            })}
                        </>}
                    </div>
                </div>
            </div>
        </div>
    </>
}