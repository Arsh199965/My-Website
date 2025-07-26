# EmailJS Setup Guide

Follow these steps to set up email functionality for your contact form:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Verify your email address

## 2. Create Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- For Gmail:
  - Service ID: Choose a name like "gmail_service"
  - Connect your Gmail account
  - Follow the authentication process

## 3. Create Email Template
- Go to "Email Templates" in your dashboard
- Click "Create New Template"
- Template ID: Choose a name like "contact_template"
- Use this template structure:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
To: arsh199965@gmail.com

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

## 4. Get Your Public Key
- Go to "Account" > "General"
- Copy your "Public Key"

## 5. Update Environment Variables
Edit your `.env.local` file with your actual values:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. Template Variables
Make sure your EmailJS template includes these variables:
- {{from_name}} - Sender's name
- {{from_email}} - Sender's email
- {{message}} - The message content
- {{to_email}} - Your email (arsh199965@gmail.com)

## 7. Test the Form
- Restart your development server after updating .env.local
- Fill out and submit the contact form
- Check your email for the message
- Check EmailJS dashboard for send statistics

## Important Notes:
- EmailJS free plan allows 200 emails per month
- Always restart your dev server after changing .env.local
- Keep your keys secure and never commit .env.local to version control
- The current implementation sends emails directly to arsh199965@gmail.com

## Troubleshooting:
- If emails aren't sending, check the browser console for errors
- Verify all environment variables are set correctly
- Make sure your EmailJS service is connected and active
- Check your spam folder for test emails
