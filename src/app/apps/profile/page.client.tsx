"use client";
import React from "react";

interface ProfileCardProps {
  name: string;
  email: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email }) => {
  return (
    <div className="p-1">
      <div className="p-2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Email:
        </div>
        <div className="text-base text-gray-700 font-medium">{email}</div>
      </div>
      <div className="p-2 mt-2">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Fullname:
        </div>
        <div className="text-lg leading-tight text-black font-medium">
          {name}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
