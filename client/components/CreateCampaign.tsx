"use client";

import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Users } from "lucide-react"
import { Button } from "./ui/button"
import { SearchOptionBox } from "./SearchOptionBox";
import { Input } from "./ui/input";
import { createCampaign } from "@/utils/createCampaign";
import { useAuth } from "@clerk/nextjs";


export default function CreateCampaign({ allSegments, allCampaigns }: any) {
    const [campaignName, setCampaignName] = useState("");
    const [segmentName, setSegmentName] = useState("");
    const [message, setMessage] = useState("");
    const auth = useAuth();

    const option = allSegments.map((segment: any) => {
        return {
            value: segment.name,
            label: segment.name[0].toUpperCase() + segment.name.slice(1),
        }
    });

    const handleSendCampaign = async () => {
        let segmentId = allSegments.find((segment: any) => segment.name === segmentName)._id;
        const data = await createCampaign({ clerkId: auth.userId, name: campaignName, segmentId, message });
        allCampaigns.push(data);
    };

    return <Dialog>
        <DialogTrigger
            className="bg-gray-400 text-md py-5 px-2 font-bold rounded-[12px] h-9 inline-flex justify-center items-center gap-2 text-white text-md hover:bg-primary">
            <Users className="text-md" />
            Create Campaign
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="mb-4">Enter Campaign Info:</DialogTitle>
                <DialogDescription>
                    <span>Enter campaign name</span>
                    <Input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
                </DialogDescription>
                <DialogDescription className="flex flex-col">
                    <span className="mb-1">Select campaign:</span>
                    <SearchOptionBox options={option} setSegmentName={setSegmentName} segmentValue={segmentName} />
                </DialogDescription>
                <DialogDescription className="flex flex-col">
                    <span className="mb-1">Enter message</span>
                    <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={handleSendCampaign}>Create</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
};
