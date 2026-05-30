import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user?.profileImageUrl]);

  const handelLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.trim().split(/\s+/);
    return words.map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  };

  const hasProfileImage = user?.profileImageUrl && user.profileImageUrl.trim() !== "" && !imageError;

  return (
    user && (
      <div className="flex items-center gap-3 bg-gray-50/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-gray-200/50 shadow-xs hover:shadow-md transition-all duration-300">
        {hasProfileImage ? (
          <img
            src={user.profileImageUrl}
            alt={user.name}
            className="w-9 h-9 object-cover rounded-full border border-orange-200 shadow-xs"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-9 h-9 bg-linear-to-tr from-[#FF9324] to-[#e99a4b] text-white font-bold rounded-full flex items-center justify-center shadow-xs border border-white text-xs tracking-wider">
            {getInitials(user.name)}
          </div>
        )}
        <div className="text-left leading-none flex flex-col justify-center">
          <div className="text-[13px] text-gray-800 font-bold mb-0.5">
            {user.name || ""}
          </div>
          <button
            className="text-amber-600 text-[11px] font-semibold cursor-pointer hover:text-black transition-colors block text-left"
            onClick={handelLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
