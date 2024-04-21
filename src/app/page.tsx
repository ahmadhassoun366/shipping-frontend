"use client";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import HeaderComponent from "./layout/header/header.component";
import bg from "../../public/img/Image.png"; // Make sure the path is correct
import man from "../../public/img/man.png";
import man2 from "../../public/img/man2.png";
import man3 from "../../public/img/man3.png";
import cta from "../../public/img/CTA.png";
import bg2 from "../../public/img/bg2.png";
import Footer from "./layout/footer/footer.component";
import Link from "next/link";
export default function Home() {
  const [relocationCount, setRelocationCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [containersCount, setContainersCount] = useState(0);

  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      setter: {
        (value: SetStateAction<number>): void;
        (value: SetStateAction<number>): void;
        (value: SetStateAction<number>): void;
        (arg0: any): void;
      }
    ) => {
      let current = start;
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor(duration / range));

      const timer = setInterval(() => {
        current += increment;
        setter(current);
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    };

    animateValue(0, 139, 3000, setRelocationCount);
    animateValue(0, 799, 500, setClientsCount);
    animateValue(0, 982, 500, setContainersCount);
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bg.src})`, // Correctly reference the image source
          backgroundSize: "100% 100%", // Change to "cover" to fill the entire div area
          backgroundRepeat: "no-repeat",
        }}
      >
        <header className="border-b-2">
          <nav className=" text-white p-8">
            <div className="container mx-auto flex items-center justify-between">
              <Link
                href="/"
                className="flex  justify-center items-center gap-2"
              >
                <i className="fa-regular fa-truck-ramp-couch fa-2xl"></i>
                <h1 className="text-4xl font-bold">
                  <span className="text-red-500 text-4xl font-bold">UN</span>
                  PACK
                </h1>
              </Link>
              <div className="flex items-center">
                <Link href="/">
                  <h1 className="px-4 py-2 hover:bg-gray-700 rounded">HOME</h1>
                </Link>
                <Link href="/about">
                  <h1 className="px-4 py-2 hover:bg-gray-700 rounded">
                    ABOUT US
                  </h1>
                </Link>
                <Link href="/service">
                  <h1 className="px-4 py-2 hover:bg-gray-700 rounded">
                    SERVICE
                  </h1>
                </Link>
                {/* Dropdown functionality would require custom JS or a dedicated component */}
                <div className="relative group">
                  <button className="px-4 py-2 hover:bg-gray-700 rounded inline-flex items-center">
                    FEATURES
                  </button>
                  <div className="absolute hidden bg-white text-gray-900 group-hover:block">
                    <Link href="/feature1">
                      <h1 className="px-4 py-2 block hover:bg-gray-100">
                        Feature 1
                      </h1>
                    </Link>
                    <Link href="/feature2">
                      <h1 className="px-4 py-2 block hover:bg-gray-100">
                        Feature 2
                      </h1>
                    </Link>
                    <Link href="/feature3">
                      <h1 className="px-4 py-2 block hover:bg-gray-100">
                        Feature 3
                      </h1>
                    </Link>
                  </div>
                </div>
                <Link href="/blog">
                  <h1 className="px-4 py-2 hover:bg-gray-700 rounded">BLOG</h1>
                </Link>
                <Link href="/contact">
                  <h1 className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors">
                    CONTACT US
                  </h1>
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <section className="flex justify-around min-h-screen">
          <div className="w-[30%] space-y-10 mt-32">
            <div className="space-x-4 flex items-center">
              <span className="inline-block w-20 h-1 bg-white"></span>
              <h1 className="text-white uppercase font-thin">
                fast & secure move
              </h1>
            </div>
            <h1 className="text-7xl font-medium uppercase text-white">
              Moving Was Never
              <span className="text-7xl font-medium uppercase text-red-500">
                So Easy
              </span>
            </h1>
            <div className="space-x-2">
              <button
                className="text-white
              "
              >
                GET STARTED
              </button>
              {/* icon for left arrow  */}
              <i className="fa-solid fa-arrow-right bg-red-500 p-2 rounded-full text-white"></i>
            </div>
          </div>
          <div className="flex flex-col items-end w-2/4 space-y-10 mt-32">
            <div className="flex flex-col items-end">
              <h1 className="text-red-500 text-3xl">Relocation</h1>
              <span className="font-bold text-6xl text-white">
                {relocationCount}+
              </span>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-red-500 text-3xl">Clients</h1>
              <span className="font-bold text-6xl text-white">
                {clientsCount.toLocaleString()}k
              </span>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-red-500 text-3xl">Moving Containers</h1>
              <span className="font-bold text-6xl text-white">
                {containersCount}+
              </span>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-white flex justify-center items-center min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <Image className="" alt="" src={man} />
        </div>
        <div className="flex-1 space-y-8 ">
          <div className="space-x-4 flex items-center">
            <span className="inline-block w-20 h-1 bg-red-500"></span>
            <h1 className="text-red-500 uppercase font-thin">About Us</h1>
          </div>
          <div className="">
            <h1 className="text-5xl font-medium uppercase text-black">
              Transport &
            </h1>
            <br />
            <span className="text-5xl font-medium uppercase text-red-500">
              logistics
            </span>
          </div>
          <div className=" text-gray-500 w-3/4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            fuga vero inventore nisi quam nesciunt, necessitatibus, quia
            reprehenderit praesentium ullam ab corporis dolor animi cum earum.
            Odio, quae. Ipsa, velit.
          </div>
          <div className=" text-gray-500 w-3/4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
            fuga vero inventore nisi quam nesciunt, necessitatibus, quia
            reprehenderit praesentium ullam ab corporis dolor animi cum earum.
            Odio, quae. Ipsa, velit.
          </div>
          {/* socail media icons */}
          <div className="space-x-4 flex  justify-end w-[70%]">
            <i className="fa-brands fa-facebook-f text-xl text-gray-500 border border-gray-500 p-2 rounded-full"></i>
            <i className="fa-brands fa-twitter text-xl text-gray-500 border border-gray-500 p-2 rounded-full"></i>
            <i className="fa-brands fa-instagram text-xl text-gray-500 border border-gray-500 p-2 rounded-full"></i>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${bg2.src})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen flex flex-col justify-center items-center text-white relative gap-20"
      >
        {/* Overlay div */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Ensure the rest of the content is positioned above the overlay */}

        {/* Title */}
        <div className="relative z-10 space-x-4 flex items-center">
          <span className="inline-block w-20 h-1 bg-red-500"></span>
          <h1 className="text-red-500 uppercase font-thin">Our service</h1>
        </div>

        {/* Subtitle */}
        <div className="relative z-10 flex space-x-3">
          <h1 className="text-5xl font-medium uppercase">Precise &</h1>
          <p className="text-5xl font-medium uppercase text-red-500">
            hardworking
          </p>
        </div>
        <div className="relative z-10 flex justify-between gap-48">
          {/* Card 1 */}
          <div className="bg-white w-64 p-6 flex flex-col items-center space-y-10 shadow-lg">
            <div className="absolute -top-10 w-20 h-20 bg-black rounded-full  flex items-center justify-center">
              <i className="fa-light fa-truck fa-xl text-white fa-2xl"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-600">National Moving</h2>
            <p className="text-center text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
            <button className="text-gray-500 underline underline-gray-500 px-4 py-2 rounded-md">
              Get Started
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-red-500 w-64 p-6 flex flex-col items-center space-y-10 shadow-lg">
            <div className="absolute -top-10 w-20 h-20 bg-black rounded-full  flex items-center justify-center">
              <i className="fa-regular fa-store text-white fa-2xl"></i>
            </div>
            <h2 className="text-xl font-bold text-white">Storage Units</h2>
            <p className="text-center text-white ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
            <button className=" text-white underline underline-gray-500 px-4 py-2 rounded-md">
              Get Started
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white w-64 p-6 flex flex-col items-center space-y-10 shadow-lg">
            <div className="absolute -top-10 w-20 h-20 bg-black rounded-full  flex items-center justify-center">
              <i className="fa-light fa-truck-ramp-box text-white fa-2xl"></i>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Moving Kits</h2>
            <p className="text-center text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
            <button className="text-gray-500 underline underline-gray-500 px-4 py-2 rounded-md">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center items-center min-h-screen">
        <div className="flex-1 space-y-8 flex flex-col justify-center items-end">
          <div className="space-x-4 flex items-center">
            <span className="inline-block w-20 h-1 bg-red-500"></span>
            <h1 className="text-red-500 uppercase font-thin">our experience</h1>
          </div>
          <div className="flex flex-col items-end">
            <h1 className="text-5xl font-medium uppercase text-black">
              let the numbers
            </h1>
            <br />
            <span className="text-5xl font-medium uppercase text-red-500">
              speak
            </span>
          </div>
          <div className="space-y-4 w-3/4">
            <div className="flex justify-end items-center  space-x-4">
              <div className=" ">
                <i className="fa-regular fa-warehouse-full  fa-2xl text-red-500"></i>
              </div>
              <div className="flex flex-col w-3/4 items-end space-y-2">
                <div className="flex justify-between items-center  w-full">
                  <h2 className="text-xl w-1/4 mx-2 text-red-500 font-medium uppercase">
                    WAREHOUSING
                  </h2>
                  <span className="ml-2 text-red-500  ">90%</span>
                </div>
                <div className="w-full bg-gray-300 h-2">
                  <div
                    className="bg-gray-800 h-2"
                    style={{ width: "90%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center  space-x-4">
              <div className="">
                <i className="fa-light fa-hand-holding-box text-gray-500 fa-2xl"></i>
              </div>
              <div className="flex flex-col w-3/4 items-end space-y-2">
                <div className="flex justify-between items-center  w-full">
                  <h2 className="text-xl w-1/4 mx-2 text-gray-500 font-medium uppercase">
                    packaging
                  </h2>
                  <span className="ml-2 text-gray-500  ">83%</span>
                </div>
                <div className="w-full bg-gray-300 h-2">
                  <div
                    className="bg-gray-600 h-2"
                    style={{ width: "83%" }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center  space-x-4">
              <div className=" ">
                <i className="fa-light fa-truck-fast fa-2xl text-gray-500"></i>
              </div>
              <div className="flex flex-col w-3/4 items-end space-y-2">
                <div className="flex justify-between items-center  w-full">
                  <h2 className="text-xl w-1/4 mx-2 text-gray-500 font-medium uppercase">
                    shipping
                  </h2>
                  <span className="ml-2 text-gray-500  ">95%</span>
                </div>
                <div className="w-full bg-gray-300 h-2">
                  <div
                    className="bg-gray-600 h-2"
                    style={{ width: "95%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center  space-x-4">
              <div className=" ">
                <i className="fa-regular fa-cart-flatbed-boxes fa-2xl text-gray-500"></i>
              </div>
              <div className="flex flex-col w-3/4 items-end space-y-2">
                <div className="flex justify-between items-center  w-full">
                  <h2 className="text-xl w-1/4 mx-2 text-gray-500 font-medium uppercase">
                    reliability
                  </h2>
                  <span className="ml-2 text-gray-500  ">85%</span>
                </div>
                <div className="w-full bg-gray-300 h-2">
                  <div
                    className="bg-gray-600 h-2"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Image className="" alt="" src={man2} />
        </div>
      </div>

      {/* Why Choose US */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-white gap-20 mb-20">
        {/* Title */}
        <div className=" space-x-4 flex items-center">
          <span className="inline-block w-20 h-1 bg-red-500"></span>
          <h1 className="text-red-500 uppercase font-thin">why choose us</h1>
        </div>

        {/* Subtitle */}
        <div className=" flex space-x-3">
          <h1 className="text-5xl font-medium uppercase text-black">
            the
            <span className="text-5xl font-medium uppercase text-red-500 mx-3">
              best
            </span>
            movers around
          </h1>
        </div>
        <div className="flex  space-x-14">
          <div className="flex flex-col justify-around items-end space-y-20">
            <div className="flex  flex-col items-end space-y-2 w-2/4">
              <h1 className="font-bold text-gray-500 uppercase">
                proffessional service
              </h1>
              <p className="text-justify text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="flex flex-col items-end space-y-2 w-2/4">
              <h1 className="font-bold text-gray-500 uppercase">
                proffessional service
              </h1>
              <p className="text-justify text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>
          <div className="relative ">
            {/* Main Image */}
            <Image className="" alt="" src={man3} />
            {/* Icons */}

            <div className="absolute -left-8 top-8 flex justify-center items-center bg-gray-200 p-2    w-20 h-16 ">
              <i className="fa-light fa-award fa-2xl text-gray-500"></i>
            </div>
            <div className="absolute -right-8 top-8 flex justify-center items-center bg-red-500 p-2    w-20 h-16 ">
              <i className="fa-light fa-truck-clock fa-2xl text-white"></i>
            </div>
            <div className="absolute -left-8 bottom-8 flex justify-center items-center bg-gray-200 p-2    w-20 h-16 ">
              <i className="fa-light fa-truck-fast fa-2xl text-gray-500"></i>
            </div>
            <div className="absolute -right-8 bottom-8 flex justify-center items-center bg-gray-200 p-2    w-20 h-16 ">
              <i className="fa-light fa-display-chart-up fa-2xl text-gray-500"></i>
            </div>
          </div>
          <div className="flex flex-col justify-around items-start space-y-20">
            <div className="flex flex-col items-start space-y-2 w-2/4">
              <h1 className="font-bold text-black uppercase">
                proffessional service
              </h1>
              <p className="text-justify text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
            <div className="flex flex-col items-start space-y-2 w-2/4">
              <h1 className="font-bold text-gray-500 uppercase">
                proffessional service
              </h1>
              <p className="text-justify text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${cta.src})`, // Correctly reference the image source
          backgroundSize: "contain", // Change to "cover" to fill the entire div area
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen flex flex-col justify-center items-start text-white gap-20"
      >
        <div className="flex flex-col p-44 gap-20">
          <div className="w-3/4">
            <h1 className="text-5xl font-medium uppercase text-white">
              Our Fleet is Ready to Ship
              <span className="text-5xl font-medium uppercase text-red-500 mx-3">
                Worldwide
              </span>
            </h1>
          </div>
          <div className="space-x-2">
            <button
              className="text-white
              "
            >
              Call Us now
            </button>
            {/* icon for left arrow  */}
            <i className="fa-solid fa-arrow-right bg-red-500 p-2 rounded-full text-white"></i>
          </div>
        </div>
      </div>
      <section className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md space-y-20">
          <div className="space-y-10">
            <div className=" space-x-4 flex items-center  justify-center">
              <span className="inline-block w-20 h-1 bg-red-500"></span>
              <h1 className="text-red-500 uppercase font-thin">Contact US</h1>
            </div>
            <div className="flex flex-col items-end">
              <h1 className="text-5xl font-medium uppercase text-black">
                <span className="text-5xl font-medium uppercase text-red-500">
                  moving
                </span>{" "}
                the way you want
              </h1>
            </div>
          </div>
          <form action="#" className="space-y-8">
            <div className="flex items-center justify-between space-x-10">
              <div className="w-2/4 ">
                <label className="block  text-sm font-medium text-gray-900 dark:text-gray-300 uppercase">
                  Name
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className=" w-2/4">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between space-x-10">
              <div className="w-2/4 ">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 uppercase">
                  Phone Number
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                />
              </div>
              <div className=" w-2/4">
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="border-b border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 uppercase">
                service description
              </label>
              <textarea
                id="message"
                className="border-b border-gray-300 text-gray-900 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              ></textarea>
            </div>
            <div className="space-x-2  flex justify-end items-end">
              <button
                className="text-black font-bold text-xl
              "
              >
                Booking Now
              </button>
              {/* icon for left arrow  */}
              <i className="fa-solid fa-arrow-right bg-red-500 p-2 rounded-full text-black"></i>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
}
