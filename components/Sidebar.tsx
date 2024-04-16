'use client';

import { SidebarLinks } from '@/constant';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
	const pathname = usePathname();

	return (
		<section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 max-lg:px-2 pt-28 text-white max-sm:hidden lg:w-[340px]'>
			<div className='flex flex-1 flex-col gap-6'>
				{SidebarLinks.map((link) => {
					const isActive =
						pathname === link.route ;

					return (
						<Link
							href={link.route}
							key={link.label}
							className={cn(
								'flex gap-4 items-center py-4 px-3 justify-start text-white/60 hover:bg-blue-950/60 rounded-lg border-2 border-[#020817] hover:border-blue-700 text-md w-full cursor-pointer transition-colors',
								{
									'bg-blue-950/60 font-semibold border-blue-600 text-white': isActive,
								}
							)}>
							<div className='flex'>
								<link.icon className={cn('h-6 w-6 mr-3 max-lg:mx-1' , {'text-blue-600' : isActive})} />
								<p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default Sidebar;
