"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const Create = () => {
    const router = useRouter(); // Use Next.js router for navigation
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        about: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (!formData.fullName || !formData.email || !formData.password || !formData.about) {
            toast.error('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('User created successfully!');
                setFormData({ fullName: '', email: '', password: '', about: '' }); // Reset form

                // Redirect to /viewall after successful submission
                setTimeout(() => {
                    router.push('/viewall');
                }, 1500); // Add a small delay to allow the toast to display
            } else {
                toast.error(result.message || 'Failed to create user.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="h-screen">
            <Toaster />
            <div className="h-full flex flex-col items-center justify-center gap-10">
                <h1 className="text-6xl">Create user</h1>
                <form className="flex flex-col gap-5 items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-[720px] h-[60px] border-[1px] border-black text-xl pl-3"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-[720px] h-[60px] border-[1px] border-black text-xl pl-3"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-[720px] h-[60px] border-[1px] border-black text-xl pl-3"
                    />
                    <textarea
                        name="about"
                        placeholder="Write about yourself"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-[720px] h-[150px] border-[1px] border-black text-xl p-3"
                    ></textarea>
                    <button className="text-2xl font-bold text-white w-[460px] h-[80px] rounded-full bg-[#4D4D4D] mt-5">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create;
