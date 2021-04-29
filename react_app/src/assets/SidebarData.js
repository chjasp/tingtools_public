import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as CgIcons from "react-icons/cg";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io5";

export const SidebarData = [
    {
        title: "Product Description",
        path: "/",
        icon: <CgIcons.CgWebsite/>,
        cName: "Product Description"
    },
    {
        title: "Blog Ideas",
        icon: <GiIcons.GiBrain />,
        cName: "Blog Idea"
    },
    {
        title: "Blog Intro",
        icon: <IoIcons.IoCreateSharp />,
        cName: "Blog Intro"
    },
    {
        title: "Google Ad",
        icon: <AiIcons.AiFillGoogleSquare />,
        cName: "Google Ad"
    },
    {
        title: "Facebook Ad",
        icon: <AiIcons.AiFillFacebook />,
        cName: "Facebook Ad"
    },
]