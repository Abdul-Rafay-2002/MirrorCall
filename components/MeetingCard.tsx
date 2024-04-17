import { LucideIcon, PlusIcon } from 'lucide-react';
import React from 'react'

interface MeetingCardProps {
	Icon: LucideIcon;
	title: string;
	description: string;
	bgColor: string;
	handleClick: () => void;
}

const MeetingCard = ({Icon, title, description, bgColor, handleClick}: MeetingCardProps) => {
  return (
		<div
			className={`${bgColor} px-4 py-6  flex flex-col justify-between w-full xl:max-w-[380px] rounded-xl cursor-pointer min-h-[260px]`}
			onClick={handleClick}>
			<div className='flex justify-center items-center size-12 rounded-lg bg-slate-100/20'>
				<Icon/>
			</div>
			<div className='flex flex-col gap-1'>
				<h3 className='text-xl font-semibold'>{title}</h3>
				<p className='text-slate-100/80'>{description}</p>
			</div>
		</div>
	);
}

export default MeetingCard