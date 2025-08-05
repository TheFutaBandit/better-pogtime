'use client'

import { useAuthToken } from "@/stores/authStore";
import SkeletonCard from "./skeleton-card";
import { SectionCards } from ".";

const MainSectionCard = () => {
    const token = useAuthToken();

    if(!token) {
        return <SkeletonCard />
    }

    return (
        <>  
           <SectionCards token = {token} />
        </>
    )
}

export default MainSectionCard;