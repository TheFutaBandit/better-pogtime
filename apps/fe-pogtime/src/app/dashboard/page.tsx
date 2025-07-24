import { useRequireAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
    const {isLoading, user} = useRequireAuth();

    if(isLoading) return <div>LOADING</div>

    return redirect(`/dashboard/${user}`);
}