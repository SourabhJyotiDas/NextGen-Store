import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerificationComponent = () => {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingCode, setIsLoadingCode] = useState(false);

  const handleEmailSubmit = async () => {
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    setIsLoadingEmail(true);
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
    } finally {
      setIsLoadingEmail(false);
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
      toast.error("Please enter a 6-digit code.");
      return;
    }

    setIsLoadingCode(true);
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
      setIsVerified(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCode(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 p-4 rounded-md shadow">
      {!isEmailSubmitted ? (
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoadingEmail}
          />
          <button
            onClick={handleEmailSubmit}
            disabled={isLoadingEmail}
            className={`w-full text-white py-3 rounded-md transition ${
              isLoadingEmail
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {isLoadingEmail ? "Sending Code..." : "Verify"}
          </button>
        </div>
      ) : !isVerified ? (
        <div className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            placeholder="Enter 6-digit code"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoadingCode}
          />
          <button
            onClick={handleCodeSubmit}
            disabled={isLoadingCode}
            className={`w-full text-white py-3 rounded-md transition ${
              isLoadingCode
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}>
            {isLoadingCode ? "Verifying..." : "Submit"}
          </button>
        </div>
      ) : (
        <div className="text-center text-green-700 font-semibold text-lg">
          Thank you! Your email has been successfully verified.
        </div>
      )}
    </div>
  );
};

export default EmailVerificationComponent;
