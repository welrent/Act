import Link from 'next/link';

export default function ControlPanel() {
  const tools = [
    {
      title: 'Company Settings',
      description: 'Set your company address, email, VAT number and more. These values replace placeholders across all legal pages automatically.',
      href: '/secret-panel/settings',
      badge: 'Active',
      badgeColor: '#22c55e',
      disabled: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      )
    },
    {
      title: 'Site Text Editor',
      description: 'Modify the content of static pages like Terms of Service, Privacy Policy, and Agreements.',
      href: '/secret-panel/editor',
      badge: 'Active',
      badgeColor: '#22c55e',
      disabled: false,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      )
    },
    {
      title: 'Global Settings',
      description: 'Update site name, contact email, and other global configurations.',
      href: '#',
      badge: 'Coming Soon',
      badgeColor: '#8C8C91',
      disabled: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 4.6z"></path>
        </svg>
      )
    },
    {
      title: 'User Management',
      description: 'View registered users, manage roles, and review login activity.',
      href: '#',
      badge: 'Coming Soon',
      badgeColor: '#8C8C91',
      disabled: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      title: 'Analytics',
      description: 'Track page views, user interactions, and agreement downloads.',
      href: '#',
      badge: 'Coming Soon',
      badgeColor: '#8C8C91',
      disabled: true,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    }
  ];

  const stats = [
    { label: 'Pages', value: '8' },
    { label: 'Languages', value: '4' },
    { label: 'Agreements', value: '3' },
    { label: 'Status', value: 'Live' },
  ];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>

      {/* Dark Gradient Header */}
      <div style={{
        background: 'linear-gradient(135deg, #2F214B 0%, #4A3270 100%)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20px', right: '80px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
          <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>Admin Area · Restricted</span>
        </div>

        <h1 style={{ color: '#FFFFFF', fontSize: '26px', fontWeight: 800, margin: '0 0 6px 0', letterSpacing: '-0.5px' }}>Control Panel</h1>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', margin: '0 0 24px 0' }}>Manage your site content and configuration from one central location.</p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '12px' }}>
              <div style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', marginTop: '3px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
        {tools.map((tool, idx) => (
          <Link
            key={idx}
            href={tool.disabled ? '#' : tool.href}
            style={{
              display: 'block',
              padding: '22px',
              background: '#FAFAFA',
              border: '1px solid #F0EEF6',
              borderRadius: '14px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              opacity: tool.disabled ? 0.6 : 1,
              cursor: tool.disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{
                width: '42px', height: '42px',
                background: 'linear-gradient(135deg, #EEE9F8, #DDD5F3)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#2F214B',
              }}>
                {tool.icon}
              </div>
              <span style={{
                fontSize: '10px', fontWeight: 700, letterSpacing: '0.6px',
                textTransform: 'uppercase', padding: '3px 9px',
                borderRadius: '20px',
                backgroundColor: tool.badge === 'Active' ? 'rgba(34,197,94,0.08)' : '#F4F5F6',
                color: tool.badgeColor,
                border: tool.badge === 'Active' ? '1px solid rgba(34,197,94,0.2)' : '1px solid #EBEBEB',
              }}>
                {tool.badge}
              </span>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#2F214B', margin: '0 0 6px 0' }}>{tool.title}</h3>
            <p style={{ fontSize: '13px', color: '#9C9CA0', margin: 0, lineHeight: 1.6 }}>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
