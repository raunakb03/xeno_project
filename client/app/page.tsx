"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAllUsers, getFilteredUsers } from "@/utils/getUsers";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Home as HomeIcon, Plus, Users, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Filter from "@/components/Filter";

const tableRows = [
    "Name",
    "Email",
    "Phone Number",
    "Total Spending",
    "Visit Count",
    "Last Visit",
];

export default function Home() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [allUsers, setAllUsers] = useState([]);
    const [filterConditions, setFilterConditions] = useState([]);

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
                    {/* Bread crum section */}
                    <div className="flex items-center space-x-2 text-gray-400">
                        <HomeIcon className="icon_size_20" />
                        <span className="text-[18px]">/</span>
                        <span className="text-[18px]">Users</span>
                    </div>
                    <h1 className="text-[30px] font-bold text-gray-500">Users</h1>
                    <div className="flex justify-end items-center gap-3">
                        <Button className="bg-gray-400 text-md py-5 font-bold px-2 rounded-[12px]">
                            <Plus />
                            Add User
                        </Button>
                        {
                            <Filter setFilterConditions={setFilterConditions} />}
                        <Button className="bg-gray-400 text-md py-5 font-bold px-2 rounded-[12px]"
                            onClick={() => setFilterConditions([])}>
                            <X />
                            Reset Filter
                        </Button>
                        <Button className="bg-gray-400 text-md py-5 font-bold px-2 rounded-[12px]">
                            <Users />
                            Create Segment
                        </Button>
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
