import { ArrowBigLeftDash, CalendarPlus, Home, PersonStanding, Video } from "lucide-react";


export const SidebarLinks = [
    {
        label: 'Home',
        route: '/',
        icon: Home,
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        icon: CalendarPlus,
    },
    {
        label: 'Previous',
        route: '/previous',
        icon: ArrowBigLeftDash,
    },
    {
        label: 'Recordings',
        route: '/recordings',
        icon: Video,
    },
    {
        label: 'Personal Meeting Room',
        route: '/personal-meeting-room',
        icon: PersonStanding,
    },
]

export const avatarImages = [
    '/images/avatar-1.jpg',
    '/images/avatar-2.jpg',
    '/images/avatar-3.jpeg',
    '/images/avatar-4.jpg',
    '/images/avatar-5.jpg',
];