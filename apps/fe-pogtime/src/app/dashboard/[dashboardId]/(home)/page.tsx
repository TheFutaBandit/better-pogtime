import MainTable from "@/components/dashboard-components/data-table/main-table";
import MainChart from "@/components/dashboard-components/chart-area/main-chart";
import MainSectionCard from "@/components/dashboard-components/SectionCards/main-card";


type Props = {
    
}

export default function page() {
    return (
        <div className = "flex flex-1 flex-col"> {/*this step doesn't seem necessary, but since we copying fuck it*/}
            <div className = "@container/main flex flex-1 flex-col gap-2">
                <div className = "flex flex-col gap-4 py-4 md:gap-6 md:py-4">
                    <MainSectionCard />
                    <div className="px-4 lg:px-6">
                        <MainChart />
                    </div>
                    <MainTable />
                </div>
            </div>
        </div>        
    )
}

