'use client';
import {
	DeviceSettings,
	VideoPreview,
	useCall,
} from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const MeetingSetup = ({
	setIsSetupCompleted,
}: {
	setIsSetupCompleted: (value: boolean) => void;
}) => {
	const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
	const call = useCall();
	if (!call)
		throw new Error('UseCall must be used within it StreamCall Component!');

	useEffect(() => {
		if (isMicCamToggledOn) {
			call?.camera.disable();
			call?.microphone.disable();
		} else {
			call?.camera.enable();
			call?.microphone.enable();
		}
	}, [isMicCamToggledOn, call?.camera, call?.microphone]);

	return (
		<div className='flex h-screen w-full flex-col items-center gap-3 justify-center text-slate-100 '>
			<h1 className='text-slate-100 text-4xl font-bold'>Setup</h1>
			<VideoPreview />
			<div className='h-16 justify-center flex items-center gap-3'>
				<label className='flex items-center gap-2 justify-center font-medium text-slate-100 '>
					<input
						type='checkbox'
						name=''
						checked={isMicCamToggledOn}
						id=''
						onChange={(e) => {
							setIsMicCamToggledOn(e.target.checked);
						}}
					/>
					Join with mic and camera off
				</label>
				<DeviceSettings />
			</div>
			<Button
				className='rounded-md bg-green-700 py-2.5 px-4 hover:bg-green-800'
				onClick={() => {
					call.join();
					setIsSetupCompleted(true);
				}}>
				Join Meeting
			</Button>
		</div>
	);
};

export default MeetingSetup;
