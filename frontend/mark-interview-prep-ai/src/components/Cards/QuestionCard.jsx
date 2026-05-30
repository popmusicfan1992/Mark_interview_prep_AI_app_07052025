import React, { useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../pages/InterviewPrep/components/AIResponsePreview";
import { motion, AnimatePresence } from "framer-motion";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white rounded-2xl mb-4 overflow-hidden py-4 px-5 border border-gray-100 shadow-xs group transition-all duration-300"
    >
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5 flex-grow" onClick={toggleExpand}>
          <span className="text-xs md:text-[15px] font-bold text-gray-400 leading-[18px]">
            Q
          </span>

          <h3 className="text-xs md:text-[14px] font-semibold text-gray-800 mr-0 md:mr-20 leading-relaxed hover:text-orange-500 transition-colors">
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 relative flex-shrink-0">
          <div
            className={`flex ${
              isExpanded ? "flex" : "hidden group-hover:flex"
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center justify-center gap-2 text-xs font-bold px-3 py-1.5 mr-2 rounded-lg text-nowrap border cursor-pointer shadow-3xs transition-colors ${
                isPinned 
                  ? "text-amber-800 bg-amber-50 border-amber-200" 
                  : "text-gray-600 bg-gray-50 border-gray-200"
              }`}
              onClick={onTogglePin}
            >
              {isPinned ? (
                <>
                  <LuPinOff className="text-xs" />
                  <span className="hidden md:block">Unpin</span>
                </>
              ) : (
                <>
                  <LuPin className="text-xs" />
                  <span className="hidden md:block">Pin</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-orange-850 font-bold bg-orange-50/50 border border-orange-200/50 hover:bg-orange-100 px-3 py-1.5 mr-2 rounded-lg text-nowrap cursor-pointer shadow-3xs transition-all duration-200"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
            >
              <LuSparkles className="text-orange-500 animate-pulse" />
              <span>Learn More</span>
            </motion.button>
          </div>

          <motion.button
            whileTap={{ scale: 0.85 }}
            className="text-gray-400 hover:text-gray-600 cursor-pointer p-1 rounded-full hover:bg-gray-50"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180 text-orange-500" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 text-gray-700 bg-gray-50 border border-gray-100/50 px-5 py-4 rounded-xl shadow-inner">
              <AIResponsePreview content={answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuestionCard;
