import { SectionCard } from "@/components/dashboard-components/SectionCards";
import WebsiteHeader from "@/components/website-header";
import { ReactNode } from "react";

type PropType = {
    children: ReactNode;
}


export default function page({children} : PropType){
    return (
        <div className = "flex flex-1 flex-col"> {/*this step doesn't seem necessary, but since we copying fuck it*/}
            <div className = "@container/main flex flex-1 flex-col gap-2">
                <div className = "flex flex-col gap-4 py-4 md:gap-6 md:py-4">\
                    <WebsiteHeader />
                </div>
            </div>
        </div>   
    )
}
