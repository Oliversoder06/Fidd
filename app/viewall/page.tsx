import React from "react";
import Link from "next/link";
import Card from "@/components/Card";

const Viewall = async () => {
    let users = [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
            cache: "no-store", // Ensures fresh data is fetched
        });
        const contentType = response.headers.get("content-type");

        if (response.ok && contentType && contentType.includes("application/json")) {
            users = await response.json();
        } else {
            console.error("Unexpected response format or status:", response.status, contentType);
        }
    } catch (error) {
        console.error("Failed to fetch users:", error);
    }

    return (
        <div className="h-auto mb-5">
            <div className="flex justify-center">
                <Link
                    href="/create"
                    className="text-2xl font-bold text-white w-[460px] h-[80px] rounded-full bg-[#4D4D4D] mt-5 flex items-center justify-center"
                >
                    Create another account
                </Link>
            </div>
            <div className="h-full flex flex-col items-center gap-10">
                <h1 className="text-6xl">View other accounts</h1>
                <div className="flex flex-wrap gap-4 justify-center">
                    {users.map((user: any) => (
                        <Card
                            key={user.id}
                            fullName={user.fullName}
                            email={user.email}
                            id={user.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Viewall;
