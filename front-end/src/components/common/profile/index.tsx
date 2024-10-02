'use client'
import Image from "next/image"
import TabsBtn from "../tabsBtn"
import { useSearchParams } from "next/navigation";
import { useValidateTab } from "../redirectTabs";
import React, { useEffect } from "react";
import FeedCard from "../feeds/feed-card";
import { useGetAllProductQuery } from "@/lib/hooks/products";
import SkeletonLoader from "../skeleton.loader";
import { useGetSingleUserByIdQuery } from "@/lib/hooks/user";
import { ProductProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbBrandFeedly } from "react-icons/tb";


interface ProfileProps {
    userId: string
}

export default function Profile({ userId }: ProfileProps) {
    const { data: user } = useGetSingleUserByIdQuery(userId)
    const { data: products, isLoading, error, refetch } = useGetAllProductQuery(null)
    const searchParams = useSearchParams();
    const selectedTabs = searchParams.get("tab") ?? "Feeds";
    const userProducts = products?.data.filter((products: ProductProps) => products.userId === userId);
    
    useEffect(() => {
        refetch();
    }, [refetch]);
    const tabVariants = [
        { tab: "Feeds", tabName: "Feeds", name: "Feeds", tabCount: products?.length },
        {
            tab: "Profile info",
            tabName: "Profile info",
            name: "Profile info",
            tabCount: undefined,
        },

    ];
    const currentTab = useValidateTab({
        tabVariants,
        selectedTabs,
        fallbackRoute: `?tab=Feeds`,
    });


    return (
        <section className="w-full flex flex-col">
            <h1 className="text-3xl py-3 font-semibold dm_sans">Profile</h1>
            <div className="flex flex-col w-full">
                <div className="h-[100px] w-[100px] relative rounded-full border border-[#E5EFFF]">
                    <Image src={user?.user?.image} alt="profile image" fill className="h-full w-full object-cover rounded-full object-center" />
                </div>
                <div className="dm_sans">
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl font-medium">{user?.user?.fullname}</h1>
                        <h1 className="text-xl font-medium text-[#666666]">@{user?.user?.username}</h1>
                    </div>
                    <p className="text-[#666666] text-sm py-2 max-w-xl">{user?.user?.bio}</p>
                </div>
            </div>

            <div className="my-4 flex w-full items-center overflow-x-auto border-b-2">
                {tabVariants.map((tab) => (
                    <TabsBtn
                        key={tab.tab}
                        tabCount={tab.tabCount}
                        tabName={tab.tabName}
                        name={tab.name}
                        tab={currentTab}
                        activeColor="border-[#F56630] text-[#F56630]"
                        notActiveColor="text-[#344054]"
                    />
                ))}
            </div>

            <>
                {currentTab === "Feeds" && <div className="flex flex-col">
                    <div>
                        {!userProducts || userProducts.length === 0 && <div className="flex flex-col w-full gap-3 items-center justify-center max-w-xl mx-auto">
                            <TbBrandFeedly size={50} className=" animate-bounce" />
                            <h1 className="text-lg font-medium satoshi">You don't have any Feeds Yet</h1>
                            <Link href={`/dashboard/feeds/create`} className='w-full'>
                                <Button className='text-white text-center flex flex-1 min-w-full p-4 bg-[#004AAD] hover:bg-blue-600 duration-200 rounded-md'>Create one</Button>
                            </Link>
                        </div>}
                    </div>
                    {isLoading && <SkeletonLoader count={6} loaderStyle='h-[350px] bg-[#D9D9D9]' containerStyle="grid grid-cols-1 w-full xl:grid-cols-3 gap-4" />}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                        <FeedCard feed={userProducts} />
                    </div>
                </div>}
                {currentTab === "Profile info" && (
                    <div>
                        <h1 className="text-center text-4xl font-semibold uppercase">
                            {currentTab}
                        </h1>
                    </div>
                )}
            </>
        </section>
    )

}
