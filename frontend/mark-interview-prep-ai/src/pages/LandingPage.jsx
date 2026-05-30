import React, { useState } from "react";
import HERO_IMG from "../assets/hero-img.png";
import { APP_FEATURES } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { LuSparkles, LuBrainCircuit } from "react-icons/lu";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import { motion } from "framer-motion";

const LandingPage = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <>
      <div className="w-full min-h-full bg-[#FFFCEF] relative overflow-hidden">
        {/* Animated background glowing blobs */}
        <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-amber-200/20 blur-[80px] rounded-full animate-blob1" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-200/10 blur-[90px] rounded-full animate-blob2" />
        <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-yellow-200/15 blur-[70px] rounded-full animate-blob3" />

        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 80, delay: 0.1 }}
            className="flex justify-between items-center mb-16"
          >
            <div className="flex items-center gap-2.5">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="w-9 h-9 bg-linear-to-tr from-[#FF9324] to-[#e99a4b] rounded-xl flex items-center justify-center text-white shadow-xs shadow-orange-300 cursor-pointer"
              >
                <LuBrainCircuit className="text-xl" />
              </motion.div>
              <div className="text-xl text-black font-extrabold tracking-tight">
                Interview <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">App</span>
              </div>
            </div>
            {loading ? (
              <div className="h-10 w-28 bg-amber-200/20 animate-pulse rounded-full border border-amber-300" />
            ) : user ? (
              <ProfileInfoCard />
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer shadow-md shadow-orange-100"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Sign Up
              </motion.button>
            )}
          </motion.header>

          {/* Hero Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center"
          >
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <motion.div variants={itemVariants} className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100/80 px-3 py-1 rounded-full border border-amber-300 backdrop-blur-xs">
                  <LuSparkles /> AI Powered
                </div>
              </motion.div>

              <motion.h1 
                variants={itemVariants}
                className="text-5xl text-black font-medium mb-6 leading-tight"
              >
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </motion.h1>
            </div>

            <div className="w-full md:w-1/2">
              <motion.p 
                variants={itemVariants}
                className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6 leading-relaxed"
              >
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </motion.p>

              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 147, 36, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full min-h-full relative z-10">
        <div>
          <section className="flex items-center justify-center -mt-36 px-4">
            <motion.img
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 60, delay: 0.4 }}
              src={HERO_IMG}
              alt="Hero Image"
              className="w-[80vw] rounded-2xl shadow-2xl border border-amber-100"
            />
          </section>
        </div>

        <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
          <div className="container mx-auto px-4 pt-10 pb-20">
            <section className="mt-5">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-center mb-12 text-gray-800"
              >
                Features That Make You Shine
              </motion.h2>

              <div className="flex flex-col items-center gap-8">
                {/* First 3 cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {APP_FEATURES.slice(0, 3).map((feature, idx) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="bg-[#FFFEF8] p-6 rounded-2xl shadow-xs hover:shadow-lg shadow-amber-100 transition-all border border-amber-100 cursor-pointer"
                    >
                      <h3 className="text-base font-bold mb-3 text-gray-850">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Remaining 2 cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                  {APP_FEATURES.slice(3).map((feature, idx) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="bg-[#FFFEF8] p-6 rounded-2xl shadow-xs hover:shadow-lg shadow-amber-100 transition-all border border-amber-100 cursor-pointer"
                    >
                      <h3 className="text-base font-bold mb-3 text-gray-850">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
          Make your mark where it matters most.
        </div>
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default LandingPage;
