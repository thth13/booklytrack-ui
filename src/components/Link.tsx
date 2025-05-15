'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  passHref?: boolean;
  legacyBehavior?: boolean;
};

export default function LinkWithProgress({ href, children, className, passHref, legacyBehavior }: Props) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (pathname !== href) {
      NProgress.start();
      setLoading(true);
    }
  };

  useEffect(() => {
    if (loading) {
      NProgress.done();
      setLoading(false);
    }
  }, [pathname]);

  return (
    <Link href={href} onClick={handleClick} className={className} passHref={passHref} legacyBehavior={legacyBehavior}>
      {children}
    </Link>
  );
}
