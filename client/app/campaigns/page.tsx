"use client";

import BreadCrum from "@/components/Breadcrum";
import CreateCampaign from "@/components/CreateCampaign";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCampaigns } from "@/utils/createCampaign";
import { getSegments } from "@/utils/createSegment";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

const tableRows = [
    "Name",
    "Segment Name",
    "Message",
    "Total",
    "Success",
];

export default function Campaigns() {
    const [allSegments, setAllSegments] = useState([]);
    const [allCampaigns, setAllCampaigns] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        async function fetchSegments() {
            const response = await getSegments();
            setAllSegments(response);
        }
        async function fetchCampaigns() {
            const response = await getCampaigns(auth.userId);
            setAllCampaigns(response);
        }
        fetchSegments();
        fetchCampaigns();
    }, [auth]);

return <section>
    <BreadCrum text={"Campaigns"} Icon={User} />
    <SignedIn>
    <div className="flex justify-end items-center gap-3">
        <CreateCampaign allSegments={allSegments} allCampaigns={allCampaigns} />
    </div>
    <div className="mt-12">
        <Table>
            <TableCaption>List of Campaigns (Total {allCampaigns.length})</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                    tableRows.map((row, index) => (
                    <TableHead key={index} className="font-bold text-[16px]">{row}</TableHead>
                    ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {allCampaigns.map((campaign: any, index) => (
                <TableRow key={index}>
                    <TableCell className="text[15px]">{campaign.name}</TableCell>
                    <TableCell className="text[15px]">{campaign.segmentId.name}</TableCell>
                    <TableCell className="text[15px]">{campaign.message}</TableCell>
                    <TableCell className="text[15px]">{campaign.segmentId.userId.length}</TableCell>
                    <TableCell className="text[15px]">{campaign.success.length}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
    </SignedIn>
    <SignedOut>Signed Out</SignedOut>
</section>
};
