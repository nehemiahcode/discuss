'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetSingleUserByIdQuery } from "@/lib/hooks/user";
import { useToken } from "../token";
import { RxAvatar } from "react-icons/rx";




export default function HeroSection() {
    const token = useToken("sessionStorage");
    const sessionToken = token?.id || ""
    const { data: data, error, isLoading } = useGetSingleUserByIdQuery(sessionToken)
    const router = useRouter()
    const [state, setState] = useState(false);


    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Admin", path: "/dashboard/admin-dashboard" },
        { title: "Feeds", path: "/dashboard/feeds" },
        { title: "Users", path: "/dashboard/users" },
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target as Element;
            if (!target?.closest(".menu-btn")) setState(false);
        };
        return () => {
            document.onclick = null;
        };
    }, [])


    const Brand = () => (
        <div className="flex items-center justify-between py-5 md:block">
            <Link href="javascript:void(0)">
                <Image
                    src="https://www.floatui.com/logo-dark.svg"
                    width={120}
                    height={50}
                    alt="Float UI logo"
                />
            </Link>
            <div className="md:hidden flex items-center flex-row-reverse gap-3">
                <button className="menu-btn text-gray-400 hover:text-gray-300"
                    onClick={() => setState(!state)}
                >
                    {
                        state ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )
                    }
                </button>
                {data ?
                    <Link href={`/profile/${data?.user?._id}`}>
                        <div className="relative h-10 w-10">
                            {data?.user?.image ? <Image src={data?.user?.image} alt="image" fill className="h-full bg-white w-full rounded-full object-cover object-center" />
                                :
                                <div className="flex items-center justify-center h-full w-full bg-white rounded-full ">
                                    <RxAvatar size={26} />
                                </div>
                            }
                        </div>
                    </Link> : null}
            </div>
        </div>
    )

    return (
        <div className="bg-gray-900">
            <header>
                <div className={`md:hidden ${state ? "mx-2 pb-5" : "hidden"}`}>
                    <Brand />
                </div>
                <nav className={`pb-5 md:text-sm ${state ? "absolute z-20 top-0 inset-x-0 bg-gray-800 rounded-xl mx-2 mt-2 md:mx-0 md:mt-0 md:relative md:bg-transparent" : ""}`}>
                    <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                        <Brand />
                        <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                            <ul className="flex-1 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
                                {
                                    navigation.map((item, idx) => {
                                        return (
                                            <li key={idx} className="text-gray-300 hover:text-gray-400">
                                                <Link href={item.path} className="block">
                                                    {item.title}
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                                <li>
                                    {data ?
                                        <Link href={`/profile/${data?.user?._id}`} className="hidden md:flex">
                                            <div className="relative h-10 w-10">
                                                {data?.user?.image ? <Image src={data?.user?.image} alt="image" fill className="h-full bg-white w-full rounded-full object-cover object-center" />
                                                    :
                                                    <div className="flex items-center justify-center h-full w-full bg-white rounded-full ">
                                                        <RxAvatar size={26} />
                                                    </div>
                                                }
                                            </div>
                                        </Link> :
                                        <Link href="/login" className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-full md:inline-flex">
                                            Get started
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="relative dm_sans">
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
                    <div className="max-w-4xl mx-auto text-center flex flex-col">
                        <h2 className="text-4xl text-white font-extrabold mx-auto md:text-5xl">
                            Build and scale up your startup with the best tools
                        </h2>
                        <p className="max-w-2xl mx-auto text-gray-400">
                            Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.
                        </p>

                        <Link href={"/login"} className="mt-5">
                            <Button className="flex items-center justify-center mx-auto gap-x-2 py-2.5 px-4 w-full text-sm text-white font-medium bg-sky-500 hover:bg-sky-400 active:bg-sky-600 duration-150 rounded-lg sm:mt-0 sm:w-auto">
                                Get started
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                                </svg>
                            </Button>
                        </Link>

                    </div>
                </div>
                <div className="absolute inset-0 m-auto max-w-xs h-[357px] blur-[118px] sm:max-w-md md:max-w-lg" style={{ background: "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)" }}></div>
            </section>
        </div>
    )
}
