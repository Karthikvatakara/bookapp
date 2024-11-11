"use client";
import AOS from "aos";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function HeaderSection() {
    const router = useRouter();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true
        })
    },[]);

    const handlAddBook = () => {
        console.log("1111111111111111");
        router.push("/addbook");
    }
  return (
    <div className='grid lg:grid-cols-12  md:grid-cols-12 grid-cols-1' data-aos="fade-left ">
        <div className="lg:col-span-8 md:col-span-12 col-span-1 flex justify-center items-center pt-9">
            <div className="lg:space-y-4  md:space-y-2 lg:text-5xl md:text-3xl text-xl lg:p-0 md:p-2 p-4">
            <h1 className='font-bold  text-darkBlue'>
            {/* <TypeWriterAnimation text='unlock Your Potential With' delay={100}/> */}
            </h1>
            <h1 className='font-bold  text-darkBlue '>Find Your Books here....</h1>
            <p className='text-sm font-bold text-gray-500 '>Welcome to our e-learning platform! Discover accessible, engaging, <br />and 
                transformative learning experiences. Empower yourself with diverse courses,<br /> connect with experts, and unlock your potential. Embrace the future of education—your <br /> journey to success begins here!</p>
            </div>
        </div>
        <div className=" md:col-span-12 md:items-center lg:col-span-4 col-span-1 pt-9" >
            <img src="/ui/homePage.jpg" alt="" />
        </div>
        <div className="col-span-12 flex pt-7 pe-6 justify-end items-end ">
            <button className=" p-2 bg-yellow-300 font-bold text-xl hover:bg-yellow-400 text-blue-600  rounded-lg hover:text-blue-900" onClick={handlAddBook}>Add Book</button>
        </div>
        </div>
  )
}

export default HeaderSection