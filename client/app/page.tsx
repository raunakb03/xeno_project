"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllUsers, getFilteredUsers } from "@/utils/getUsers";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Home as HomeIcon, Plus, Users, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Filter from "@/components/Filter";
import { createSegment } from "@/utils/createSegment";
import BreadCrum from "@/components/Breadcrum";
import SegmentName from "@/components/SegmentName";

const tableRows = [
    "Name",
    "Email",
    "Phone Number",
    "Total Spending",
    "Visit Count",
    "Last Visit",
];

export default function Home() {
    const [allUsers, setAllUsers] = useState([]);
    const [filterConditions, setFilterConditions] = useState([]);

    const handleCreateSegment = async (name: any) => {
        let userIds: any = allUsers.map((user:any) => user._id);
        userIds = {
            name,
            userId: userIds,
        }
        await createSegment(userIds);
    };

    useEffect(() => {
        async function fetchFilteredUsers() {
            const data = await getFilteredUsers(filterConditions);
            setAllUsers(data);
        }
        fetchFilteredUsers();
    }, [filterConditions]);

    useEffect(() => {
        async function fetchAllUsersData() {
            const data = await getAllUsers();
            setAllUsers(data);
        }
        fetchAllUsersData();
    }, []);

    return (
        <>
            <SignedOut>Signed out</SignedOut>
            <SignedIn>
                <section>
                    <BreadCrum text={"Users"} Icon={HomeIcon} />
                    <div className="flex justify-end items-center gap-3">
                        <Filter setFilterConditions={setFilterConditions} />
                        <Button className="bg-gray-400 text-md py-5 font-bold px-2 rounded-[12px]"
                            onClick={() => setFilterConditions([])}>
                            <X />
                            Reset Filter
                        </Button>
                        <SegmentName handleCreateSegment={handleCreateSegment} segmentSize={allUsers.length} />
                    </div>
                    <div className="mt-12">
                        <Table>
                            <TableCaption>List of Users (Total {allUsers.length})</TableCaption>
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
                                {allUsers.map((user: any, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="text[15px]">{user.name}</TableCell>
                                        <TableCell className="text[15px]">{user.email}</TableCell>
                                        <TableCell className="text[15px]">{user.phone}</TableCell>
                                        <TableCell className="text[15px]">{user.total_spend}</TableCell>
                                        <TableCell className="text[15px]">{user.visit_count}</TableCell>
                                        <TableCell className="text[15px]">{new Date(user.last_visit).toLocaleDateString('en-GB')}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </section>
            </SignedIn>
        </>
    );
}
