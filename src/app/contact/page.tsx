'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import {Mail, Phone, MapPin, Send, MessageSquare, Sun, Moon, Sparkles, Loader2, Clock} from 'lucide-react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({   
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light');
  };

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

  if (!mounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8 selection:bg-indigo-500 selection:text-white ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-6xl mx-auto space-y-10">

        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleTheme}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95 ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>

        <header className="text-center space-y-4 max-w-2xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest backdrop-blur-md ${
            isDark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'
          }`}>
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-extrabold tracking-tight ${
            isDark 
              ? 'bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent'
              : 'text-slate-900'
          }`}>
            We'd Love to Help
          </h1>
          <p className={`text-sm sm:text-base font-normal leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Have questions or feedback? Fill out the form below and our support team will get back to you shortly.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-5 space-y-4">
            
            <div className={`backdrop-blur-xl border rounded-3xl p-6 shadow-2xl space-y-6 ${
              isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 border-b pb-4 border-slate-800/50">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <h2 className="font-bold text-base">Contact Information</h2>
              </div>

              <div className="space-y-4 text-xs">

                <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium">Email Us</p>
                    <p className="font-bold text-sm">support@shop.com</p>
                  </div>
                </div>
                
                <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div   className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium">Call Us</p>
                    <p className="font-bold text-sm">+123 456 7890</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium">Visit Store</p>
                    <p className="font-bold text-sm">123 Main Street, Kathmandu</p>
                  </div>
                </div>

                <div className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                  isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium">Working Hours</p>
                    <p className="font-bold text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className={`backdrop-blur-xl border rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 ${
              isDark ? 'bg-slate-900/60 border-slate-800/80' : 'bg-white/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-2 border-b pb-4 border-slate-800/50">
                <Send className="w-4 h-4 text-indigo-400" />
                <h2 className="font-bold text-base">Send a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400">Your Name
                    <Input
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                        isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                    </label>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400">Your Email
                    <Input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                        isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">Subject
                  <Input
                    name="subject"
                    placeholder="Inquiry about product stock"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-2xl px-4 py-2.5 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                      isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400">Your Message
                  <Textarea
                    name="message"
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className={`w-full rounded-2xl p-4 text-xs font-medium focus:outline-none focus:border-indigo-500 transition-all ${
                      isDark ? 'bg-slate-950/80 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-lg shadow-indigo-600/30 active:scale-98 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}



