import { cn } from '@/lib/utils';
import {
	CallControls,
	CallParticipantsList,
	CallStatsButton,
	CallingState,
	PaginatedGridLayout,
	SpeakerLayout,
	useCallStateHooks,
} from '@stream-io/video-react-sdk';
import React, { useState } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LayoutList, Users } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import EndCallButton from './EndCallButton';
import Loader from './Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
	const searchParams = useSearchParams();

	//Algo for double !! mark
	// 'personal' => !'personal' => false => !false => true
	//  undefined => !undefined =? true => false

	const isPersonalRoom = !!searchParams.get('personal');
	const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
	const [showParticipants, setShowParticipants] = useState(false);
	const { useCallCallingState } = useCallStateHooks();
	const callingState = useCallCallingState();

	if (callingState !== CallingState.JOINED){
		return <Loader />;
	}


	const CallLayout = () => {
		switch (layout) {
			case 'grid':
				return <PaginatedGridLayout />;
			case 'speaker-right':
				return <SpeakerLayout participantsBarPosition={'left'} />;
			default:
				return <SpeakerLayout participantsBarPosition={'right'} />;
		}
	};

	return (
		<section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
			<div className='relative flex size-full items-center justify-center'>
				<div className='flex size-full max-w-[1000px] items-center'>
					<CallLayout />
				</div>
				<div
					className={cn('h-[calc(100vh-86px)] hidden ml-2', {
						'show-block': showParticipants,
					})}>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>
			</div>
			<div className='fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5'>
				<CallControls />

				<DropdownMenu>
					<div className='flex items-center'>
						<DropdownMenuTrigger className='cursor-pointer bg-[#19232d] p-2.5 rounded-full hover:bg-slate-800'>
							<LayoutList size={20} className='text-slate-100' />
						</DropdownMenuTrigger>
					</div>
					<DropdownMenuContent className='border-dark-1 bg-dark-1 text-slate-200'>
						{['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
							<div key={index}>
								<DropdownMenuItem
									className='cursor-pointer mb-1'
									onClick={() => {
										setLayout(item.toLowerCase() as CallLayoutType);
									}}>
									{item}
								</DropdownMenuItem>
								<DropdownMenuSeparator className='bg-slate-200/10' />
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<CallStatsButton />

				<button onClick={() => setShowParticipants((prev) => !prev)}>
					<div className=' cursor-pointer rounded-full bg-[#19232d] p-2.5 hover:bg-[#4c535b]  '>
						<Users size={20} className='text-white' />
					</div>
				</button>
				{!isPersonalRoom && <EndCallButton />}
			</div>
		</section>
	);
};

export default MeetingRoom;
