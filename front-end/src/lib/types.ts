import { StaticImageData } from "next/image";

export interface ProductProps {
    title:string;
    description:string;
    price:number;
    isAdmin:boolean;
    image:StaticImageData;
    onboarded:boolean,
    _id:string;
    userId?:string;
    createdAt?:string;
}
