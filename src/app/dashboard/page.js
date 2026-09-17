'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import KomuniCoreApp from '../components/KomuniCoreApp';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'admin';

  return (
    <KomuniCoreApp 
      initialRole={role} 
      onBackToHome={() => router.push('/')} 
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-slate-400">Loading Disaster Relief OS...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
