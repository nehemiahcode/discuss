"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoHome } from "react-icons/go";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { LuShoppingBag } from "react-icons/lu";
import { SlEarphonesAlt } from "react-icons/sl";
// import Logo from "../../../";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RiMenu2Fill } from "react-icons/ri";
import { useGetSingleUserByIdQuery } from "@/lib/hooks/user";
import { useToken } from "../token";

export interface SidebarLink {
    name: string;
    path: string;
    icon: JSX.Element;
    count?: number;
}

const userSidebar = [
    {
        name: "Home",
        path: "/",
        icon: <GoHome size={21} />,
    },
    {
        name: "Feeds",
        path: "/dashboard/feeds",
        icon: <SlEarphonesAlt size={20} />,
    },
    {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <SlEarphonesAlt size={20} />,
    },
    {
        name: "Settings",
        path: "/dashboard/settings",
        icon: <IoSettingsOutline size={20} />,
    },
];



const adminSidebar = [
    {
        name: "Home",
        path: "/",
        icon:<GoHome size={21} />
    },
    {
        name: "Feeds",
        path: "/dashboard/feeds",
        icon: <SlEarphonesAlt size={20} />,
    },
    {
        name: "Manage users",
        path: "/dashboard/users",
        icon: <HiOutlineUserGroup size={20} />,
    },
    {
        name: "Profile",
        path: "/dashboard/profile",
        icon: <SlEarphonesAlt size={20} />,
    },
    {
        name: "Settings",
        path: "/dashboard/settings",
        icon: <IoSettingsOutline size={20} />,
    },
];
const sidebarLinks = () => {
    const token = useToken()
    const { data, error: err, isLoading: loading } = useGetSingleUserByIdQuery(token?.id || "");
    if (data.user.isAdmin) {
        adminSidebar
    } else {
        userSidebar
    }
}

export default function Sidebar() {

    const pathname = usePathname();
    const token = useToken()
    const { data, error: err, isLoading: loading } = useGetSingleUserByIdQuery(token?.id || "");
    return (
        <aside
            className={`dm_sans z-9999 absolute left-0 top-0 hidden h-screen w-[17rem] flex-col overflow-y-hidden bg-[#FFFFFF] duration-300 ease-linear lg:static lg:flex lg:translate-x-0`}
        >
            {/* <!-- SIDEBAR LOGO --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
                <Link href="/dashboard">
                 <h1>Logo</h1>
                </Link>
            </div>

            <div className="no-scrollbar flex h-screen flex-col justify-between overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2 px-4 py-4 lg:px-6">
                    <ul className="flex flex-col gap-1.5">
                    {(data?.user?.isAdmin ? adminSidebar : userSidebar).map((links:SidebarLink) => {
                            if (!links) {
                                return null;
                            }
                                return (
                                    <li key={links.name}>
                                        <Link
                                            href={links.path}
                                            className={`flex items-center justify-between gap-2.5 ${pathname === links.path ? "border border-[#FFECE5] bg-[#FFF9EF] font-medium text-[#001B3F]" : "border-none bg-transparent"} rounded-sm p-2 px-4 py-2 text-sm text-[#344054] duration-300 ease-in-out hover:bg-[#FBF9F3]`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span
                                                    className={` ${pathname === links.path && "text-orange-500"}`}
                                                >
                                                    {links.icon}
                                                </span>
                                                {links.name}
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export function MobileNav() {
    const pathname = usePathname();
    const token = useToken()
    const { data, error: err, isLoading: loading } = useGetSingleUserByIdQuery(token?.id || "");
    return (
        <div className="lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={"icon"}>
                        <RiMenu2Fill size={25} />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    side={"left"}
                    className="dm_sans z-[9999] flex h-full w-[75%] flex-col overflow-y-auto bg-white"
                >
                    <div className="flex items-center justify-between gap-2 py-5 lg:py-6">
                        <Link href="/dashboard">
                        <h1>Logo</h1>
                        </Link>
                    </div>
                    <div className="flex h-full flex-col justify-between">
                        <nav className="mt-2 py-4">
                            <ul className="flex flex-col gap-1.5">
                            {(data?.user?.isAdmin ? adminSidebar : userSidebar).map((links:SidebarLink) => {
                                        if (!links) {
                                            return null;
                                        }
                                        return (
                                            <li key={links.name}>
                                                <Link
                                                    href={links.path}
                                                    className={`flex items-center gap-2.5 whitespace-nowrap ${pathname === links.path ? "border border-[#FFECE5] bg-[#FFF9EF] font-medium text-[#001B3F]" : "border-none bg-transparent"} rounded-sm p-2 px-4 py-2 text-xs text-[#344054] duration-300 ease-in-out hover:bg-[#FBF9F3]`}
                                                >
                                                    <SheetClose className="flex w-full items-center justify-between gap-2.5 whitespace-nowrap">
                                                        <div className="flex items-center gap-2.5">
                                                            <span
                                                                className={` ${pathname === links.path && "text-orange-500"}`}
                                                            >
                                                                {links.icon}
                                                            </span>
                                                            {links.name}
                                                        </div>
                                                        <span
                                                            className={`rounded-[10px] bg-[#F8FFED] px-2`}
                                                        >
                                                            {links.count}
                                                        </span>
                                                    </SheetClose>
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
