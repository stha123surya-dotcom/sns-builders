import React, { useState } from 'react';
import { SEO } from '../SEO';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '../../lib/firestore-errors';

export function ContactTab() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    let dbSuccess = false;

    // 1. Save to Firebase Database
    try {
      await addDoc(collection(db, 'contact_submissions'), {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp()
      });
      dbSuccess = true;
    } catch (error) {
      console.error("Firestore contact submission error:", error);
      try {
        handleFirestoreError(error, OperationType.CREATE, 'contact_submissions');
      } catch (fErr) {
        // Continue
      }
    }

    // 2. Send Email directly to inbox via FormSubmit (backup)
    try {
      await fetch("https://formsubmit.co/ajax/stha123surya@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _subject: `New Website Inquiry: ${formData.subject}`,
          _template: "table"
        })
      });
    } catch (emailErr) {
      console.warn("FormSubmit email error:", emailErr);
    }

    // 3. Directly open WhatsApp with pre-filled formatted message
    const whatsappNumber = "9779841737795"; // WhatsApp number
    const messageLines = [
      `*New Inquiry - Shape & Structure Builders*`,
      ``,
      `*Name:* ${formData.firstName.trim()} ${formData.lastName.trim()}`,
      `*Email:* ${formData.email.trim()}`,
      formData.phone.trim() ? `*Phone:* ${formData.phone.trim()}` : null,
      `*Subject:* ${formData.subject.trim()}`,
      ``,
      `*Message:*`,
      `${formData.message.trim()}`
    ].filter(line => line !== null).join('\n');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageLines)}`;
    window.open(whatsappUrl, '_blank');

    setIsSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    setIsSubmitting(false);
    setTimeout(() => setIsSuccess(false), 8000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Shape & Structure Builders for your next construction project." 
      />
      
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Have a project in mind? We'd love to hear from you. Reach out to our team of experts for a consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            
            <h3 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Our Location</h4>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    Lalitpur, Nepal<br />
                    Bagmati Province
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone Number</h4>
                  <p className="text-primary-foreground/70">
                    +977 9841737795<br />
                    +977 9849105107
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Email Address</h4>
                  <p className="text-primary-foreground/70">
                    info@snsbuilders.com.np
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Working Hours</h4>
                  <p className="text-primary-foreground/70">
                    Sun - Fri: 10:00 AM - 5:00 PM<br />
                    Saturday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 bg-surface rounded-3xl p-8 md:p-10 border border-border shadow-sm">
          <h3 className="text-2xl font-bold mb-8">Send us a Message</h3>
          
          {isSuccess ? (
            <div className="bg-emerald-500/10 text-emerald-300 p-8 rounded-2xl flex flex-col items-center justify-center text-center border border-emerald-500/30 h-full min-h-[350px]">
              <CheckCircle2 size={56} className="text-emerald-400 mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold mb-2 text-white">Opening WhatsApp...</h4>
              <p className="text-slate-300 max-w-md">Your filled form details have been formatted and directed to our WhatsApp line (+977 9841737795) and saved successfully.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-semibold text-primary">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-semibold text-primary">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-primary">Phone Number (Optional)</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    placeholder="+977 9800000000"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-primary">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-primary">Message</label>
                <textarea 
                  id="message" 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:bg-surface focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-extrabold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/25 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSubmitting ? 'Opening WhatsApp...' : (
                  <>Send Message via WhatsApp <MessageCircle size={20} className="fill-white/20" /></>
                )}
              </button>
              <p className="text-center text-xs text-slate-400">
                Clicking "Send Message" formats your details and opens WhatsApp directly to chat with our team (+977 9841737795).
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
