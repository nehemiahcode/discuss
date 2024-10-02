"use client";
import { useGetAllProductQuery } from "@/lib/hooks/products";
import FeedCard from "@/components/common/feeds/feed-card";
import SkeletonLoader from "@/components/common/skeleton.loader";
import { useEffect } from "react";
import { toast } from "sonner";

const Feeds = () => {

  const {
    data: products,
    error,
    isLoading,
    refetch
  } = useGetAllProductQuery(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <SkeletonLoader
      count={6}
      loaderStyle='h-[350px] bg-[#D9D9D9] w-full'
      containerStyle="grid grid-cols-1 w-full xl:grid-cols-3 gap-4" />
  }
  if (error) {
    return toast.error("An error occured")
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      <FeedCard feed={products?.data} />
    </div>
  );
};

export default Feeds;
