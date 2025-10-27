"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AvatarContext {
    stepName: string,
    setStepName: React.Dispatch<React.SetStateAction<string>>,
    mainImage: string,
    setMainImage: React.Dispatch<React.SetStateAction<string>>,
    UploadImage: string,
    setUploadImage: React.Dispatch<React.SetStateAction<string>>,
    urlUpload: string,
    setUrlUpload: React.Dispatch<React.SetStateAction<string>>,
    hasToken: boolean,
    setHasToken: React.Dispatch<React.SetStateAction<boolean>>,
    token?: string,
    setToken: React.Dispatch<React.SetStateAction<string>>
}

const AvatarContext = createContext<AvatarContext | null>(null);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
    const [stepName, setStepName] = useState<string>("image");
    const [mainImage, setMainImage] = useState<string>("");
    const [UploadImage, setUploadImage] = useState<string>("");
    const [urlUpload, setUrlUpload] = useState<string>("");
    const [hasToken, setHasToken] = useState<boolean>(false);
    const [token, setToken] = useState("");
    return (
        <AvatarContext.Provider value={{ stepName, setStepName, mainImage, setMainImage, UploadImage, setUploadImage, hasToken, setHasToken, urlUpload, setUrlUpload, token, setToken }}>
            {children}
        </AvatarContext.Provider>
    )
}

export const useAvatarContext = () => {
    const context = useContext(AvatarContext);
    if (!context) {
        throw new Error("useAvatarContext must be used within a AvatarProvider");
    }
    return context
}