import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { Button } from '../../components/ui/Button';
import { contactSchema, ContactSchemaType } from '../../lib/validation';
import { submitContact } from '../../lib/api';
import { socialLinks } from '../../data/navigation';
import { PageTransition } from '../../components/layout/PageTransition';

export const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '', // Honeypot
    },
  });

  const onSubmit = async (data: ContactSchemaType) => {
    setIsSubmitting(true);
    setSubmissionStatus({ type: null, message: '' });

    const response = await submitContact(data);

    setIsSubmitting(false);
    if (response.success) {
      setSubmissionStatus({
        type: 'success',
        message: response.message,
      });
      reset();
    } else {
      setSubmissionStatus({
        type: 'error',
        message: response.message,
      });
    }
  };

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-8">
        <div>
          <SectionHeading
            eyebrow="Direct Communication"
            title="Get in Touch"
            description="Whether you have an open engineering position, a project to discuss, or want to connect — my inbox is open."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Direct Contacts Column */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-surface border border-border space-y-4">
              <h3 className="text-base font-bold text-foreground">Contact Information</h3>

              <div className="space-y-4 text-sm">
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted-foreground">
                      Email
                    </span>
                    <span className="font-medium text-foreground break-all">{socialLinks.email}</span>
                  </div>
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted-foreground">
                      LinkedIn
                    </span>
                    <span className="font-medium text-foreground">arunpandian-developer</span>
                  </div>
                </a>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <Github className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted-foreground">
                      GitHub
                    </span>
                    <span className="font-medium text-foreground">arun-pandian-p</span>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-muted-foreground pt-2 border-t border-border/60">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono uppercase text-muted-foreground">
                      Location
                    </span>
                    <span className="font-medium text-foreground">{socialLinks.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-surface-elevated border border-border text-xs text-muted-foreground space-y-2">
              <p className="font-semibold text-foreground">Direct Response Guarantee</p>
              <p>
                Messages submitted through this form are validated and routed through the Java Spring
                Boot API directly to PostgreSQL. I typically respond within 24 hours.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-2">
            <div className="p-6 sm:p-8 rounded-xl bg-surface border border-border">
              <h3 className="text-xl font-bold text-foreground mb-6">Send an Inquiry</h3>

              {submissionStatus.type === 'success' && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-start gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" />
                  <span>{submissionStatus.message}</span>
                </div>
              )}

              {submissionStatus.type === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <span>{submissionStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot field (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    type="text"
                    id="company"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('company')}
                  />
                </div>

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase font-mono tracking-wider font-semibold text-foreground mb-1.5"
                  >
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    maxLength={100}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      errors.name ? 'border-red-500' : 'border-border'
                    }`}
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase font-mono tracking-wider font-semibold text-foreground mb-1.5"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="alex@company.com"
                    maxLength={255}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      errors.email ? 'border-red-500' : 'border-border'
                    }`}
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs uppercase font-mono tracking-wider font-semibold text-foreground mb-1.5"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. SDE Opportunity / Full-Stack Project"
                    maxLength={200}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                      errors.subject ? 'border-red-500' : 'border-border'
                    }`}
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500 font-medium">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase font-mono tracking-wider font-semibold text-foreground mb-1.5"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Describe your inquiry, project scope, or opportunity details..."
                    maxLength={5000}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-y ${
                      errors.message ? 'border-red-500' : 'border-border'
                    }`}
                    {...register('message')}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    icon={<Send className="w-4 h-4 ml-1" />}
                    className="w-full sm:w-auto"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

