'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChatBubbleBottomCenterTextIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useUserStore } from '@/app/shared/store';

const studentLinks = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Submission', href: '/dashboard/student/submission', icon: DocumentDuplicateIcon },
  { name: 'Communicate', href: '/dashboard/communication', icon: UserGroupIcon },
];

const lecturerLinks = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Feedback', href: '/dashboard/lecturer/feedback', icon: ChatBubbleBottomCenterTextIcon },
  { name: 'Communicate', href: '/dashboard/communication', icon: UserGroupIcon },
];

function NavLinks() {
  const pathname = usePathname();
  const role = useUserStore((state) => state.user?.role! );

  const links = role === 'lecturer' ? lecturerLinks : studentLinks;

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
