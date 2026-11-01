import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' })
    .max(100, { message: 'Name must not exceed 100 characters' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email must not exceed 255 characters' }),
  subject: z
    .string()
    .min(3, { message: 'Subject must be at least 3 characters long' })
    .max(200, { message: 'Subject must not exceed 200 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(5000, { message: 'Message must not exceed 5000 characters' }),
  company: z.string().optional(), // Honeypot field
});

export type ContactSchemaType = z.infer<typeof contactSchema>;

