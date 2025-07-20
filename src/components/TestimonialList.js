'use client';
import { useEffect, useState } from 'react';

export default function TestimonialList({ admin = false }) {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(setTestimonials);
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Delete this testimonial?')) {
      await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' });
      setTestimonials(prev => prev.filter(t => t._id !== id));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {testimonials.map(({ _id, name, review, rating, imageUrl }) => (
        <div key={_id} className="bg-white/10 backdrop-blur p-6 rounded-lg shadow">
          <div className="flex items-center gap-4 mb-2">
            <img src={imageUrl} alt={name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-400" />
            <div>
              <p className="font-semibold text-white">{name}</p>
              <div className="text-yellow-400">
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
              </div>
            </div>
          </div>
          <p className="text-sm text-white/80">{review}</p>
          {admin && (
            <button onClick={() => handleDelete(_id)}
              className="mt-3 text-sm text-red-400 hover:text-red-600">Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
