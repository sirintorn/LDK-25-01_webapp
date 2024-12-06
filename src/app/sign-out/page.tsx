/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { AppSession } from "@/services/configs/appSession";
import { useEffect } from "react";


const signOutPage = () => {
    useEffect(() => {
        AppSession.deleteUser();
        window.location.assign('/');
    });

    return (
        <></>
    );
}

export default signOutPage;