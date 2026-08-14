'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { role } = useAuth();

  const sections = [
    {
      title: 'Navigation',
      links: [
        { name: 'Dashboard', href: '/' },
        { name: 'My Profile', href: '/profile' },
        { name: 'Car Agreements', href: '/pages/car-rental-agreement' },
        { name: 'Boat Agreements', href: '/pages/boat-rental-agreement' },
        { name: 'Equipment Agreements', href: '/pages/equipment-rental-agreement' },
      ]
    },
    {
      title: 'Legal Hub',
      links: [
        { name: 'Terms of Service', href: '/pages/terms' },
        { name: 'Privacy Policy', href: '/pages/privacy' },
        { name: 'Cookie Rules', href: '/pages/cookie' },
      ]
    }
  ];

  // Only show Admin Core to admins and workers
  if (role === 'admin' || role === 'worker') {
    sections.push({
      title: 'Admin Core',
      links: [
        { name: 'Control Panel', href: '/secret-panel' },
        { name: 'Company Settings', href: '/secret-panel/settings' },
        { name: 'Site Text Editor', href: '/secret-panel/editor' },
      ]
    });
  }

  return (
    <div className="design-sidebar">
      {sections.map((section, idx) => (
        <div key={idx} className="sidebar-section">
          <div className="sidebar-section-title">{section.title}</div>
          {section.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
