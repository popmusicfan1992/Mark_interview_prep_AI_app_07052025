import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";
import { motion } from "framer-motion";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -6, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
      }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="bg-white border border-gray-200/60 rounded-2xl p-2.5 overflow-hidden cursor-pointer shadow-xs relative group transition-all duration-300"
      onClick={onSelect}
    >
      <div
        className="rounded-xl p-4.5 cursor-pointer relative overflow-hidden"
        style={{
          background: colors?.bgcolor || "#FFF6EB",
        }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-11 h-11 bg-white/90 backdrop-blur-xs rounded-xl flex items-center justify-center mr-4 shadow-sm border border-orange-100">
            <span className="text-sm font-bold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          {/* Content Container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* Title and Skills */}
              <div>
                <h2 className="text-[16px] font-extrabold text-gray-800 tracking-tight leading-tight mb-1">{role}</h2>
                <p className="text-[11px] font-semibold text-amber-700 bg-amber-50/50 px-2 py-0.5 rounded border border-amber-150/20 inline-block">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
          whileTap={{ scale: 0.95 }}
          className="hidden group-hover:flex items-center justify-center w-8 h-8 text-rose-600 bg-white/90 backdrop-blur-xs rounded-full shadow-sm hover:text-rose-700 cursor-pointer absolute top-3 right-3 border border-rose-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 size={14} />
        </motion.button>
      </div>

      <div className="px-3.5 pb-3">
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="text-[10px] font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/50">
            Experience: {experience} {experience == 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/50">
            {questions} Q&A
          </div>

          <div className="text-[10px] font-bold text-gray-700 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200/50">
            {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default SummaryCard;
