import React, { ReactNode } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';

interface MeetingModelProps {
	isOpen: boolean;
	title: string;
	className?: string;
	children?: ReactNode;
	handleClick?: () => void;
	onClose: () => void;
	buttonText?: string;
	image?: string;
	Icon?: LucideIcon;
}

const MeetingModel = ({
	isOpen,
	onClose,
	title,
	className,
	handleClick,
	children,
	buttonText,
	image,
	Icon,
}: MeetingModelProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='flex w-full max-w-[500px] flex-col gap-6 border-none px-6 py-9 pb-12 bg-dark-1 text-white'>
				<div className='flex flex-col gap-6'>
					{image && <Image src={image} width={72} height={72} alt='Image' />}
				</div>
				<h1 className={cn('text-3xl font-bold leading-10 ', className)}>
					{title}
				</h1>
				{children}
				<Button
					className=' flex gap-2 bg-blue-700 py-6 mx-4 hover:bg-blue-700/60  focus-visible:ring-0 focus-visible:ring-offset-0'
					onClick={handleClick}>
					{Icon && <Icon />}
					{buttonText || 'Schedule Meeting'}
				</Button>
			</DialogContent>
		</Dialog>
	);
};

export default MeetingModel;
