import { useState, FormEvent } from 'react';
import { Mail, Send, Copy, Check, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const EMAIL = 'ab40510245@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    status: 'idle' | 'success' | 'error';
    message?: string;
    mailtoUrl?: string;
  }>({ status: 'idle' });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a subject.';
    if (!formData.message.trim()) errs.message = 'Please provide your message.';
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    // Construct mailto URL with prefilled subject and formatted body
    const emailSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const emailBody = encodeURIComponent(
      `Hello Ankit,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nContact Email: ${formData.email}`
    );
    const mailtoLink = `mailto:${EMAIL}?subject=${emailSubject}&body=${emailBody}`;

    // Launch visitor's default email client
    window.location.href = mailtoLink;

    setSubmissionStatus({
      status: 'success',
      message:
        'Your message has been formatted and opened in your email client. You can also copy the details below or email directly to ab40510245@gmail.com.',
      mailtoUrl: mailtoLink,
    });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Let's Build Something Great
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mt-4 leading-relaxed">
          Have an idea, project, or opportunity? I'd love to hear from you.
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Info & Email Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 rounded-3xl glass-panel relative overflow-hidden border border-white/10 flex flex-col justify-between h-full">
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#07090e] rounded-[14px] flex items-center justify-center text-cyan-300">
                  <Mail className="w-6 h-6" />
                </div>
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Direct Inquiries
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  ab40510245@gmail.com
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Feel free to reach out directly regarding technical discussions, web development
                  initiatives, or prospective collaborations.
                </p>
              </div>

              {/* Action Buttons: Direct Mailto & Copy */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-xl hover:opacity-95 transition-all shadow-md shadow-indigo-600/25"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me Directly</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-xl transition-all"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability & Ethics Strip */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Responsive to emails within 24–48 hours</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Open to discussions with engineering leads, product founders, and design teams.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Honest Contact Form */}
        <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-white/10">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Name <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Morgan"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.name ? 'border-rose-500/70' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Your Email <span className="text-cyan-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.email ? 'border-rose-500/70' : 'border-white/10 focus:border-cyan-400'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                Subject <span className="text-cyan-400">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Collaboration, project inquiry, or quick hello"
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  errors.subject ? 'border-rose-500/70' : 'border-white/10 focus:border-cyan-400'
                }`}
              />
              {errors.subject && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1.5">
                Message <span className="text-cyan-400">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share your goals, project timeline, or ideas..."
                className={`w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border text-xs text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${
                  errors.message ? 'border-rose-500/70' : 'border-white/10 focus:border-cyan-400'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.message}</span>
                </p>
              )}
            </div>

            {/* Submission Status Notice */}
            {submissionStatus.status === 'success' && (
              <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-200 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-cyan-300">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <span>Email Client Triggered</span>
                </div>
                <p className="leading-relaxed">{submissionStatus.message}</p>
              </div>
            )}

            {/* Send Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-[11px] text-slate-400">
                Direct mailto dispatch (no third-party tracking or credentials required)
              </p>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 rounded-xl hover:opacity-95 transition-all shadow-md shadow-indigo-600/25 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </div>

          </form>
        </div>

      </div>

    </section>
  );
}
