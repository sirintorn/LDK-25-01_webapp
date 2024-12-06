/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { AppSession } from "@/services/configs/appSession";
import { Suspense, useEffect } from "react";


const signOutPage = () => {
    useEffect(() => {
        AppSession.deleteUser();
        window.location.assign('/');
    });

    return (
        <>
            <div><span>Signing out...</span></div>
        </>
    );
}

export default signOutPage;