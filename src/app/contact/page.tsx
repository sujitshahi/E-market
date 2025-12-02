'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function Page() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

 
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <>
    
      <div className="max-w-3xl mx-auto p-6 mt-10">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Contact Us</h1>
        <p className="text-center mb-8 text-gray-700">
          Have questions or feedback? Fill out the form below and we’ll get back to you soon.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            required
          />
          <Button type="submit" className="bg-blue-400 hover:bg-blue-500" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>

        <div className="mt-10 text-center text-gray-600">
          <p>Email: support@shop.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Main Street, Your City</p>
        </div>
      </div>
    
    </>
  );
}
