import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetSingleUserByIdQuery } from '@/lib/hooks/user';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlLike } from "react-icons/sl";
import { AiOutlineMessage } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoCopyOutline } from "react-icons/io5";
import { toast } from 'sonner';
import { LuPencil } from "react-icons/lu";

interface FeedProps {
    feed: {
        userId: string;
        feedId: string;
        description: string;
        title: string;
        image: string;
        _id: string;
        createdAt: string;
    }[];
}



export function FeedItem({ feed }: { feed: any,}) {
    const [copy, setCopy] = useState<boolean>(false);
    const { data, isLoading, error } = useGetSingleUserByIdQuery(feed?.userId);
 

    const handleCopy = async () => {
        await navigator.clipboard.writeText(`/dashboard/feeds/${feed?._id}`);
            setCopy(true);
            navigator.vibrate([50, 50]);
            toast.message("Link copied to clipboard")
    };
    return (
        <Card key={feed._id} className="bg-white rounded-md p-5 xl:p-4 shadow satoshi border border-[#E5EFFF]">
            <CardHeader className={`h-72 w-full relative px-2 rounded-md border`}>
                <Image src={feed.image} alt="" fill className="h-full w-full object-cover rounded-md object-center" />
            </CardHeader>
            <CardContent className="p-2">
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/dashboard/profile/${data?.user?._id}`}>
                            <div className="relative h-10 w-10 rounded-full">
                                {data?.user?.image ?
                                    <Image
                                        src={data?.user?.image}
                                        alt="profile"
                                        fill
                                        className="h-full w-full object-cover rounded-full object-center"
                                    />
                                    :
                                    <div className='w-full h-full rounded-full uppercase font-medium bg-[#004AAD] text-white flex items-center justify-center'>
                                        {data?.user?.fullname.slice(0, 2)}
                                    </div>
                                }
                            </div>
                        </Link>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500">{data?.user?.username || `user${data?.user?._id.slice(0, 8) + "246"}`}</span>
                            <span className="text-xs text-gray-500">{moment(feed.createdAt).fromNow()}</span>
                        </div>
                    </div>
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size={"icon"}><SlOptionsVertical /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white z-[9999] inset-20 flex flex-col gap-2 py-2">
                                <div onClick={handleCopy} className="p-2 hover:bg-gray-100 active:bg-gray-200 flex items-center gap-2 justify-between cursor-pointer text-black satoshi font-medium">copy post link <IoCopyOutline /></div>
                                {(feed.userId === data?.user?._id || data?.user?.isAdmin === true) &&
                                    <Link href={`/dashbord/feeds/edit/${feed._id}`} className="p-2 hover:bg-gray-100  active:bg-gray-200 text-black satoshi font-medium flex items-center gap-2 justify-between">Edit <LuPencil/></Link>}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardTitle>
                <CardTitle className='pt-1'>
                    <span className='line-clamp-1 text-lg'>{feed.title}</span>
                </CardTitle>
                <CardDescription className='py-2 text-[#666666]'>
                    <span className='line-clamp-3'>{feed.description}</span>
                </CardDescription>
            </CardContent>
            <CardFooter className="px-2 flex items-center w-full justify-between gap-3">
                <div className='flex items-center gap-2 w-fit'>
                    <Button className="border rounded border-[#E5EFFF] p-2 flex items-center gap-2">
                        <SlLike size={22} />
                        <span className='text-xs'>22</span>
                    </Button>
                    <Link href={`/feeds/${feed._id}`} className="rounded p-2 border flex items-center gap-2 border-[#E5EFFF]">
                        <AiOutlineMessage size={22} />
                        <span className='text-xs'>22</span>
                    </Link>
                </div>
                <div className='flex flex-1 w-full flex-col'>
                    <Link href={`/dashboard/feeds/${feed._id}`} className='w-full'>
                        <Button className='text-white text-center flex flex-1 min-w-full p-4 bg-[#004AAD] hover:bg-blue-600 duration-200 rounded-md'>See more about this</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}


function FeedCard({ feed }: FeedProps) {
    return (
        <>
            {feed?.map((feeds) => (
                <FeedItem
                    key={feeds._id}
                    feed={feeds} />
            ))}
        </>
    );
}

export default FeedCard;
