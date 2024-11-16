import Link from 'next/link';
import React from 'react';

const ViewingAccount = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    let accountData = null;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
            cache: "no-store", // Ensures fresh data is fetched
        });
        const contentType = response.headers.get("content-type");

        if (response.ok && contentType && contentType.includes("application/json")) {
            accountData = await response.json();
        } else {
            console.error("Unexpected response format or status:", response.status, contentType);
        }
    } catch (error) {
        console.error("Failed to fetch account data:", error);
    }

    if (!accountData) {
        return (
            <div className="h-auto mb-5 flex flex-col items-center gap-5 mt-10">
                <h1 className="text-6xl">Account not found</h1>
            </div>
        );
    }

    const { fullName, email, about } = accountData;

    return (
        <div className="h-auto mb-5 flex flex-col items-center gap-5 mt-10">
            <div className="flex justify-center">
                <Link
                    href="/viewall"
                    className="text-2xl font-bold text-white w-[460px] h-[80px] rounded-full bg-[#4D4D4D] mt-5 flex items-center justify-center"
                >
                    Go back
                </Link>
            </div>
            <div className="h-full flex flex-col items-center gap-10 text-center">
                <h1 className="text-6xl">You're currently viewing<br /><span className='font-bold'>{fullName}</span></h1>
                <p className='text-[#838383] text-[32px]'>{email}</p>
            </div>
            <div className='w-[930px] h-auto min-h-[400px] border-2 border-black rounded-lg'>
                <p className='text-[#5f5f5f] text-[20px] p-5'>{about}</p>
            </div>
        </div>
    );
};

export default ViewingAccount;