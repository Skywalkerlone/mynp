import TestimonialList from '@/components/TestimonialList';

export default function AdminPage() {
  return (
    <div className="min-h-screen py-12 px-6 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <TestimonialList admin={true} />
    </div>
  );
}
