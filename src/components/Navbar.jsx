"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Menu, X } from "lucide-react";
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
    useGoogleTranslate(); // Initialize Google Translate
    const { user } = useUser();
    const { signOut } = useClerk();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const Links = [
        { name: "Home", link: "/" },
        { name: "Genre", link: "/genre" },
        { name: "Movies", link: "/movies" },
        { name: "TV Shows", link: "/tv-shows" },
        { name: "People", link: "/people" },
    ];

    return (
        <nav className={`fixed w-full z-50 text-white transition-all duration-300 ${isOpen ? "bg-black" : isScrolled ? "bg-gradient-to-b from-black to-black/10 backdrop-blur-sm border-white duration-300" : "bg-gradient-to-b from-black to-black/10"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="text-xl font-bold">
                        MovieStar🌟
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-12">
                        {Links.map((link) => (
                            <Link key={link.name} href={link.link} className="text-white hover:underline">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section (User Profile & Auth Buttons) */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <Avatar>
                                            <AvatarImage src={user.imageUrl} alt="User avatar" />
                                            <AvatarFallback>{user.firstName?.charAt(0) || "U"}</AvatarFallback>
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
                            <div className="hidden md:flex space-x-2">
                                <Button variant="ghost" asChild>
                                    <Link href="/sign-in">Sign In</Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <Link href="/sign-up">Sign Up</Link>
                                </Button>
                            </div>
                        )}

                        {/* Google Translate (Hidden on Mobile) */}
                        <div className="hidden sm:block" id="google_translate_element"></div>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div className={`fixed top-16 left-0 w-full h-screen bg-black text-white md:hidden transition-opacity duration-300 
                ${isOpen ? "opacity-100 block" : "opacity-0 hidden"} z-10`}>
                <div className="flex flex-col items-center py-6 space-y-4">
                    {Links.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.link} 
                            className="text-lg font-medium hover:underline"
                            onClick={() => setIsOpen(false)} // Close menu on click
                        >
                            {link.name}
                        </Link>
                    ))}
                    {!user && (
                        <div className="flex flex-col items-center space-y-3 mt-4 w-full">
                            <Button variant="ghost" asChild className="w-3/4 text-center">
                                <Link href="/sign-in" onClick={() => setIsOpen(false)}>Sign In</Link>
                            </Button>
                            <Button variant="outline" asChild className="w-3/4 text-center">
                                <Link href="/sign-up" onClick={() => setIsOpen(false)}>Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
