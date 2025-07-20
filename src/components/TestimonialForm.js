'use client';
import { useState } from 'react';

export default function TestimonialForm() {
  const [form, setForm] = useState({ name: '', review: '', rating: 5, imageUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Thank you for your testimonial!');
      setForm({ name: '', review: '', rating: 5, imageUrl: '' });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 p-6 rounded-lg space-y-4 shadow-lg backdrop-blur">
      <h3 className="text-xl font-semibold text-white">Leave a Testimonial</h3>

      <input type="text" name="name" placeholder="Your Name"
        value={form.name} onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder:text-white/60" required />

      <input type="text" name="imageUrl" placeholder="Image URL (.png or .jpg)"
        value={form.imageUrl} onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder:text-white/60" required />

      <textarea name="review" maxLength={300} placeholder="Your 50-word review..."
        value={form.review} onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-white/20 text-white placeholder:text-white/60" required />

      <select name="rating" value={form.rating} onChange={handleChange}
        className="w-full px-4 py-2 rounded bg-white/20 text-white">
        {[1, 2, 3, 4, 5].map(n => (
          <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
        ))}
      </select>

      <button type="submit" disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded">
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
