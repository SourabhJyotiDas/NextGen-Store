"use client";

import i18n from "@/app/i18n";
import { ImageKitProvider } from "imagekitio-next";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { useEffect } from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const Authprovider = ({ children }) => {

  useEffect(() => {
    i18n.changeLanguage(i18n.language || "en");
  }, []);

  const authenticator = async () => {
    const res = await fetch("/api/imagekit-auth");

    if (!res.ok) {
      throw new Error("Failed to fetch ImageKit auth");
    }

    const data = await res.json();

    console.log("Frontend received:", data);

    return {
      token: data.token,
      signature: data.signature,
      expire: data.expire,
    };
  };

  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(Authprovider);
