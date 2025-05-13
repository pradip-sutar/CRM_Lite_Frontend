import React from "react";

const ValidationCard = () => {
  return (
    <div className="flex justify-center items-center" style={{marginTop:"10rem"}}>
      <div className="bg-white shadow-lg rounded-xl p-6 w-72 h-72 flex flex-col justify-center items-center border-t-4 border-red-500">
        <h1 className="text-lg font-semibold text-gray-800 text-center mt-4 p-2">
          <span className="text-danger">Sorry! </span>You don't have valid permissions.
        </h1>
        <h4 className="text-gray-600 text-center p-4">
          Please contact the admin for access. 🙍🏽
        </h4>
      </div>
    </div>
  );
};

export default ValidationCard;
