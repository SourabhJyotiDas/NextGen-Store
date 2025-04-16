import React, { useState } from "react";
import { headers } from "../../next.config";
import { toast } from "react-toastify";
import axios from "axios";

const EmailVerificationComponent = () => {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [code, setCode] = useState("");

  const handleEmailSubmit = async () => {
    if (!email) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/user/sentVerificationCode`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data?.verificationCode) {
        const { data: sendEmailData } = await axios.post(
          `/api/sendEmail`,
          {
            to: email,
            subject: "Requesting Verification Code",
            text: data?.verificationCode,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(sendEmailData.message);
      }
      setIsEmailSubmitted(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCode(value);
    }
  };

  const handleCodeSubmit = async () => {
    if (code.length !== 6) {
      alert("Please enter a 6-digit code.");
      return;
    }

    try {
      const { data } = await axios.post(
        `/api/user/verification`,
        { verificationCode: code, email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 p-3">
      {!isEmailSubmitted ? (
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleEmailSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Verify
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter 6-digit code"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCodeSubmit}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default EmailVerificationComponent;
