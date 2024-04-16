import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNav from './MobileNav';
import { UserButton } from '@clerk/nextjs';

const Navbar = () => {
	return (
		<nav className='flex justify-between items-center z-50 w-full bg-dark-1 px-6 py-6 lg:px-10 fixed'>
			<Link href={'/'} className='flex items-center gap-1'>
				<h2 className='text-white font-bold text-2xl leading-tight tracking-wider  font-sedan max-sm:text-lg'>
					MIRROR <span className='text-blue-600 '>CALL</span>
				</h2>
			</Link>
      <div className='flex gap-5'>
      {/* Clerk - User Management */}
	  <UserButton />
      <MobileNav/>
      </div>
		</nav>
	);
};

export default Navbar;
