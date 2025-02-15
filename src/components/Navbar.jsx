"use client";
import Link from "next/link";
import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Menu } from "lucide-react";
import useGoogleTranslate from "@/hooks/useGoogleTranslate";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
    useGoogleTranslate();
    const { user } = useUser();
    const { signOut } = useClerk();
    const [isOpen, setIsOpen] = useState(false);

    const Links = [
        { name: "Home", link: "/" },
        { name: "Genre", link: "/genre" },
        { name: "Movies", link: "/movies" },
        { name: "TV Shows", link: "/tv-shows" },
        { name: "People", link: "/people" },
    ];

    return (
        <nav className="bg-black/40 backdrop-blur-sm fixed w-full z-10 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold">
                        Auth
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-6">
                        {Links.map((link) => (
                            <Link key={link.name} href={link.link} className="text-white hover:underline">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section (User Profile & Auth Buttons) */}
                    <div className="flex items-center">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar>
                                            <AvatarImage src={user.imageUrl} alt="User avatar" />
                                            <AvatarFallback>
                                                {user.firstName?.charAt(0) || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => signOut()}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button variant="ghost" asChild className="mr-2">
                                    <Link href="/sign-in">Sign In</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/sign-up">Sign Up</Link>
                                </Button>
                            </>
                        )}

                        {/* Google Translate */}
                        <div className="my-auto ml-4 hidden sm:block" id="google_translate_element"></div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden ml-4" onClick={() => setIsOpen(!isOpen)}>
                            <Menu className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isOpen && (
                    <div className="md:hidden flex flex-col bg-black/80 p-4 space-y-2 absolute w-full top-16 left-0">
                        {Links.map((link) => (
                            <Link key={link.name} href={link.link} className="text-white hover:underline">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
