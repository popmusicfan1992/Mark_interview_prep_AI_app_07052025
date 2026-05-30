import React from 'react'
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { LuBrainCircuit } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="h-16 bg-white border border-b border-gray-200/50 backdrop-blur-md py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 bg-linear-to-tr from-[#FF9324] to-[#e99a4b] rounded-xl flex items-center justify-center text-white shadow-xs shadow-orange-300">
            <LuBrainCircuit className="text-xl" />
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-black tracking-tight">
            Interview <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">App</span>
          </h2>
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  )
}

export default Navbar