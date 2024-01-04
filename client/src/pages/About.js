import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BiNews } from "react-icons/bi";
import { RiMoneyPoundBoxFill } from "react-icons/ri";

const About = () => {
  return (
    <div className="p-5 sm:px-8 overflow-x-hidden">
      <div className="p-3 sm:p-5 text-white bg-[#1f1d27] rounded-lg ">
        <h2 className="text-center text-lg sm:text-xl mb-5">About Us</h2>

        <div className="">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                className="object-cover w-full h-56 lg:h-96 rounded-lg"
                src="https://www.montgomerycountymd.gov/library/resources/images/for-you/job-seekers-banner-image.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-fill w-full h-56 lg:h-96 rounded-lg"
                src="https://www.the-network.com/wp-content/uploads/2016/10/4-tips-to-attract-job-seekers-to-your-job-board.jpg"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                className="object-fill w-full h-56 lg:h-96 rounded-lg"
                src="https://img.freepik.com/free-vector/office-teamwork-concept-with-people-working-together-flat-horizontal_1284-31709.jpg?w=2000"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="text-white">
        <div className="container my-220 mx-auto">
          <div className="">
            <div className="container my-24 px-6 mx-auto">
              <section className="mb-32 text-gray-200">
                <h2 className="text-2xl font-bold mb-12 text-center">
                  Latest articles by Place
                  <span className="text-green-600">U</span>
                </h2>

                <div className="flex flex-wrap mb-12">
                  <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pr-6 mb-6 lg:mb-0">
                    <div
                      className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
                      style={{ backgroundPosition: "50%" }}
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2021/06/10486_24B0582FE8AAC041.jpg?w=876&h=484&crop=1"
                        className="w-full max-h-80 xl:max-h-96"
                        alt="Louvre"
                      />
                      <a href="#!">
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.2)",
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
                    <h3 className="text-2xl font-bold mb-4">
                      That's the news!
                    </h3>
                    <div className="text-red-600 text-sm mb-4 flex items-center font-medium">
                      <BiNews className="w-4 h-4 mr-2" />
                      Jobs
                    </div>
                    <p className="text-gray-500 mb-6">
                      We do not charge people to apply here, just make an
                      account here and you will be eligible to apply to any
                      company.
                    </p>
                    <p className="text-gray-500">
                      A student got a job of $90k/yr by aplying to a job posted
                      by Google as a Data Scientist
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap lg:flex-row-reverse mb-12">
                  <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6 mb-6 lg:mb-0">
                    <div
                      className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
                      style={{ backgroundPosition: "50%" }}
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="https://poetsandquantsforundergrads.com/wp-content/uploads/sites/3/2017/02/Internship.jpg"
                        className="w-full max-h-80 xl:max-h-96"
                        alt="Louvre"
                      />
                      <a href="#!">
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.2)",
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pr-6">
                    <h3 className="text-2xl font-bold mb-4">
                      Internship Offers
                    </h3>
                    <div className="text-blue-600 text-sm mb-4 flex items-center font-medium">
                      <RiMoneyPoundBoxFill className="w-4 h-4 mr-2" />
                      Interns
                    </div>
                    <p className="text-gray-500">
                      An intern can make $100 to $10,000 a month, we provide you
                      people the best internships of all time. from various
                      companies like Apple, Google, Meta, Youtube, Flipkart and
                      many more. Join us today, and start your journey.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap">
                  <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pr-6 mb-6 lg:mb-0">
                    <div
                      className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg"
                      style={{ backgroundPosition: "50%" }}
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <img
                        src="https://resumegenius.com/wp-content/uploads/Featured-Hero-Image-Skills-for-Resume-500x333.png"
                        className="w-full max-h-80 xl:max-h-96"
                        alt="Louvre"
                      />
                      <a href="#!">
                        <div
                          className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.2)",
                          }}
                        ></div>
                      </a>
                    </div>
                  </div>

                  <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
                    <h3 className="text-2xl font-bold mb-4">How to Apply?</h3>
                    <div className="text-yellow-600 text-sm mb-4 flex items-center font-medium">
                      <FaMoneyBillAlt className="w-4 h-4 mr-2" />
                      Sessions
                    </div>

                    <p className="text-gray-500">
                      Soon, we will start sessions on how to keep your profile
                      updated, which jobs to apply, what to submit while
                      applying to a job. Sessions will be totally free. Just
                      watch them and learn more and more things.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center text-white bg-[#112435] rounded-lg">
        <div className="container p-6">
          <div className="">
            <p className="flex justify-center items-center">
              <span className="mr-4">Contact Us</span>
              <button
                type="button"
                className="inline-block px-5 py-2 border-2 border-white text-white font-medium text-xs leading-tight rounded-full hover:bg-[#123456] hover:bg-opacity-4 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              >
                amangarg0303@gmail.com
              </button>
            </p>
          </div>
        </div>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022-23 Copyright PlacU, All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default About;
