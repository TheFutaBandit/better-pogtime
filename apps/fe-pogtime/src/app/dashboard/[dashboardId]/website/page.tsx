import MainTickTable from "@/components/dashboard-components/data-table/main-tick-table";
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
                <div className = "flex flex-col justify-center gap-4 px-20 lg:px-24 py-20 md:gap-6 md:py-20">
                    <WebsiteHeader />
                    <MainTickTable />
                </div>
            </div>
        </div>   
    )
}
