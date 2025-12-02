"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../client";
import PeopleTable from "./Table/page";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function CoursePeople() {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        if (!cid) return;
        try {
            const enrolledUsers = await client.findUsersForCourse(cid as string);
            setUsers(enrolledUsers);
        } catch (error) {
            console.error("Error fetching users for course:", error);
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);

    return (
        <div id="wd-people">
            <h2>People</h2>
            <PeopleTable users={users} fetchUsers={fetchUsers} readOnly={true} />
        </div>
    );
}