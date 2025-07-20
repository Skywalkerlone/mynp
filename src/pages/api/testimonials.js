// src/pages/api/testimonials.js
import { connectToDatabase } from '@/lib/mongodb';
import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: String,
  review: String,
  rating: Number,
  imageUrl: String,
}, { timestamps: true });

const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json(testimonials);
  }

  if (req.method === 'POST') {
    const { name, review, rating, imageUrl } = req.body;
    if (!name || !review || !rating || !imageUrl)
      return res.status(400).json({ error: 'All fields are required' });

    const testimonial = await Testimonial.create({ name, review, rating, imageUrl });
    return res.status(201).json(testimonial);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    await Testimonial.findByIdAndDelete(id);
    return res.status(204).end();
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
