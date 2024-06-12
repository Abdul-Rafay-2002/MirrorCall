'use client'

import React from 'react';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { SidebarLinks } from '@/constant';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const MobileNav = () => {
	const pathname = usePathname();

	return (
		<section className='w-full max-w-[270px]'>
			<Sheet>
				<SheetTrigger asChild>
					<MenuIcon color='#fff' className='cursor-pointer sm:hidden' size={30} />
				</SheetTrigger>
				<SheetContent side={'left'} className='border-none bg-dark-1'>
					<SheetHeader>
						<Link href={'/'} className='flex items-center justify-center gap-1'>
							<h2 className='text-white font-black text-4xl leading-tight tracking-wider poppins '>
								MIRROR <span className='text-blue-600 '>CALL</span>
							</h2>
						</Link>
					</SheetHeader>
					<div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
						<SheetClose asChild>
							<section className='h-full flex flex-col gap-6 pt-16 text-white'>
								<div className="flex flex-col gap-6 pt-16 text-white">
								{SidebarLinks.map((link) => {
									const isActive = pathname === link.route;
									return (
										<Link
											href={link.route}
											key={link.label}
											className={cn(
												'flex gap-4 items-center py-4 px-3 justify-start text-white/60 hover:bg-blue-950/60 rounded-lg border-2 border-[#020817] hover:border-blue-700 text-md w-full cursor-pointer transition-colors',
												{
													'bg-blue-950/60 font-semibold border-blue-600 text-white':
														isActive,
												}
											)}>
											<div className='flex gap-2'>
												<link.icon
													className={cn('h-6 w-6 mr-3 max-lg:mx-1', {
														'text-blue-600': isActive,
													})}
												/>
												<p className='text-md font-semibold '>
													{link.label}
												</p>
											</div>
										</Link>
									);
								})}
								</div>
								<div>
									<p classname="text-slate-300/50 text-[.751rem] my-6 flex gap-1 items-center">
										© {new Date().getFullYear()} MirrorCall - All right reserved.
										by
										<link classname="text-[.716rem] font-bold hover:text-[#2563EB]" href="https://abdulrafayportfolio.vercel.app/" target="_blank">
											Rafay Dev
										
									</p>
								</div>
							</section>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	);
};

export default MobileNav;
