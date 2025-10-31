"use client"
// context
import { AvatarProvider, useAvatarContext } from "./context/context";
// COMPONENTS
import Home from "./steps/home/Home";
import CropImage from "./steps/cropImage/Crop";
import Upload from "./steps/Upload/Upload";
import Steps from "./components/steps";

interface Props {
    urlRoute: string;
    isToken: boolean;
    token: any;
    mainImage: string;
    role: "customer" | "owner";
}

function Content({ urlRoute, isToken, token, mainImage, role }: Props) {
    const { setRole, stepName, setMainImage, setHasToken, setUrlUpload, setToken } = useAvatarContext();

    setMainImage(mainImage);
    setHasToken(isToken);
    setUrlUpload(urlRoute);
    isToken && setToken(token);
    setRole(role);
    return (
        <>
            <Steps steps={stepName} />
            {stepName === "image" && <Home />}
            {stepName === "crop" && <CropImage />}
            {stepName === "upload" && <Upload />}
        </>
    );
}

export default function AvatarUpload({ urlRoute, isToken, token, mainImage, role }: Props) {
    return (
        <AvatarProvider>
            <Content
                urlRoute={urlRoute}
                isToken={isToken}
                token={token}
                mainImage={mainImage}
                role={role}
            />
        </AvatarProvider>
    );
}
