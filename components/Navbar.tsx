"use client";

import Link from 'next/link';
import { Home, Map, Menu, DollarSign, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold text-xl">HomeFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/explore" className="flex items-center space-x-2">
              <Map className="h-5 w-5" />
              <span>Explore</span>
            </Link>
            <Link href="/buy" className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Buy</span>
            </Link>
            <Link href="/rent" className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Rent</span>
            </Link>
            <Link href="/govaid" className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>Gov Scheme</span>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetTitle>Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                <Link
                  href="/explore"
                  className="flex items-center space-x-2 p-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Map className="h-5 w-5" />
                  <span>Explore</span>
                </Link>
                <Link
                  href="/buy"
                  className="flex items-center space-x-2 p-2"
                  onClick={() => setIsOpen(false)}
                >
                  <DollarSign className="h-5 w-5" />
                  <span>Buy</span>
                </Link>
                <Link
                  href="/rent"
                  className="flex items-center space-x-2 p-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Key className="h-5 w-5" />
                  <span>Rent</span>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}