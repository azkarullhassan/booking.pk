'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import GoBackButton from '@/components/GoBackButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitToGoogleForm();
  };

  const submitToGoogleForm = async () => {
    setIsSubmitting(true);
    
    try {
      // Create FormData for Google Form submission
      const googleFormData = new FormData();
      
      // Replace these entry IDs with your actual Google Form field IDs
      // To get these: Open your Google Form → Send → Link → Copy link → View source → Find entry.XXXXXX
      googleFormData.append('entry.123456789', formData.name); // Name field
      googleFormData.append('entry.987654321', formData.email); // Email field  
      googleFormData.append('entry.456789123', formData.subject); // Subject field
      googleFormData.append('entry.789123456', formData.message); // Message field
      googleFormData.append('entry.111222333', new Date().toLocaleString()); // Timestamp
      
      // Replace YOUR_GOOGLE_FORM_ID with your actual Google Form ID
      const googleFormUrl = 'https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse';
      
      // Submit to Google Form (this will fail silently due to CORS, but data will be submitted)
      fetch(googleFormUrl, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors'
      }).catch(() => {
        // Expected to fail due to CORS, but form submission works
      });
      
      // Send email notification
      await sendEmailNotification();
      
      alert('Thank you for your message! We have received your inquiry and will get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your message. Please try again or contact us directly at azkarullhassan7@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailNotification = async () => {
    // Create email content
    const emailSubject = `New Contact Form Submission: ${formData.subject}`;
    const emailBody = `
New contact form submission from Hotels.pak:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

Submitted at: ${new Date().toLocaleString()}

---
This message was sent from the Hotels.pak contact form.
    `.trim();

    // Create mailto link for immediate email
    const mailtoLink = `mailto:azkarullhassan7@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.open(mailtoLink, '_blank');
    
    // Also try to send via a service (you can integrate with EmailJS or similar)
    try {
      // Example with EmailJS (you'll need to set this up)
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      //   to_email: 'azkarullhassan7@gmail.com',
      //   from_name: formData.name,
      //   from_email: formData.email,
      //   subject: formData.subject,
      //   message: formData.message,
      //   timestamp: new Date().toLocaleString()
      // });
    } catch (error) {
      console.log('EmailJS not configured, using mailto fallback');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <GoBackButton />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with us for any questions or assistance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600">
                    123 Business District<br />
                    Karachi, Pakistan
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">+92 21 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">info@hotels.pak</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="h-6 w-6 text-green-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}