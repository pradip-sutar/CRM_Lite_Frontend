import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CallReport = () => {
  const IVR_acessKey = import.meta.env.VITE_IVR_key;
  const navigate = useNavigate();
  const location = useLocation();
  const { customer_name = " ", customer_phone = " " } = location.state || {};
  const [callData, setCallData] = useState([]);

  const formData = new FormData();
  formData.append("authcode", IVR_acessKey);
  formData.append("caller_num", customer_phone);

  return (
    <div className="container mt-4 p-4 bg-white shadow-lg rounded border border-primary">
      <div className="mb-2 text-end">
        <button onClick={() => navigate(-1)} className="btn btn-primary btn-sm">
          <span className="mdi mdi-keyboard-backspace"></span>
        </button>
      </div>
      <h2 className="text-center text-primary mb-4">📞 Call Report</h2>
      <div className="card mb-3 p-3 shadow-sm border">
        <h5 className="text-center">👤 {customer_name}</h5>
        <p className="text-center text-muted">📱 {customer_phone}</p>
      </div>
      <div
        className="d-flex overflow-auto pb-2"
        style={{ gap: "1rem", whiteSpace: "nowrap" }}
      >
        {callData?.length == 0 ? (
          <p>No Previous call data found.</p>
        ) : (
          callData?.map((call) => (
            <div
              key={call.id}
              className="card shadow-sm border"
              style={{ minWidth: "300px", flexShrink: 0 }}
            >
              <div className="card-body d-flex flex-column">
                <h6 className="card-title">📅 Date: {call.call_date}</h6>
                <p className="card-text">📲 Status: {call.callstatus}</p>
                <p className="card-text">👨‍💻 Call By: {call.member_num}</p>
                <p className="card-text">⏳ Duration: {call.talk_duration}s</p>
                {call.file && (
                  <div className="mt-auto">
                    <div>
                      <strong>🎧 Call Record:</strong>
                    </div>
                    <audio controls className="w-100 mt-2">
                      <source src={call.file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CallReport;
