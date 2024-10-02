import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { MobileNav } from "./sidebar";
import { TbMessage2 } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import userImage from "~/public/img/vendor/icons/users.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LiaAngleDownSolid } from "react-icons/lia";
import { useGetSingleUserByIdQuery } from "@/lib/hooks/user";
import { useToken } from "../token";
import { RxAvatar } from "react-icons/rx";

function Header() {
    const token = useToken();
     const {data, isLoading, error} = useGetSingleUserByIdQuery(token?.id || "")
  return (
    <header className="sticky right-0 top-0 z-[999] max-h-[119px] w-full bg-[#FFFFFF] shadow-sm">
      <div className="shadow-2 flex w-full items-center justify-between gap-x-3 px-3 py-5 md:px-6 2xl:px-11">
        <MobileNav />
        <div className="flex w-full items-center justify-end gap-x-2 md:max-w-full">
          <div className="relative flex flex-grow items-center md:max-w-sm">
            <Input
              type="text"
              placeholder="Search here...."
              className="w-full rounded-lg border border-gray-300 bg-white py-5 pl-8 text-sm text-[#667085] placeholder:text-[#667085]"
            />
            <span className="absolute left-2 top-3">
              <CiSearch size={20} color={"#667085"} fontSize={400} />
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 cursor-default md:cursor-pointer">
                <div className="relative h-11 w-11">
                            {data?.user?.image ? <Image src={data?.user?.image} alt="image" fill className="h-full bg-white w-full rounded-full object-cover object-center" />
                                :
                                <div className="flex items-center justify-center h-full w-full bg-white rounded-full ">
                                    <RxAvatar size={26} />
                                </div>
                            }
                        </div>
                <LiaAngleDownSolid size={20} className="hidden sm:flex" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white z-[9999] inset-20 flex flex-col gap-2 py-2">
            <Link href={"/profile"} className="p-2 hover:bg-gray-100 active:bg-gray-200 text-black satoshi font-medium">Profile</Link>
            <Link href={"/dashbord/settings"} className="p-2 hover:bg-gray-100  active:bg-gray-200 text-black satoshi font-medium">Settings</Link>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}

export default Header;
