import BreadCrum from "@/components/Breadcrum";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";

export default function Campaigns() {
    return <section>
        <BreadCrum text={"Campaigns"} Icon={User} />
        <div className="flex justify-end items-center gap-3">
            <Button className="bg-gray-400 text-md py-5 font-bold px-2 rounded-[12px]">
                <Plus />
                Create Campaign
            </Button>
        </div>

    </section>
};
