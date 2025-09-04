const TermsOfServicePage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        {/* Header Section */}
        <section className="terms-header">
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">
            Last updated: December 2024
          </p>
        </section>

        {/* Introduction */}
        <section className="terms-intro">
          <p>
            Welcome to writeaspeech.org. These Terms of Service ("Terms") govern your use of our 
            website and services. By accessing or using our service, you agree to be bound by 
            these Terms. If you do not agree to these Terms, please do not use our service.
          </p>
        </section>

        {/* Acceptance of Terms */}
        <section className="terms-section">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account, accessing our website, or using our services, you acknowledge 
            that you have read, understood, and agree to be bound by these Terms and our Privacy 
            Policy. These Terms constitute a legally binding agreement between you and writeaspeech.org.
          </p>
        </section>

        {/* Description of Service */}
        <section className="terms-section">
          <h2>2. Description of Service</h2>
          <p>
            writeaspeech.org provides AI-powered speech writing services, including but not limited to:
          </p>
          <ul>
            <li>Personalized speech generation using artificial intelligence</li>
            <li>Multiple speech styles and templates</li>
            <li>Practice tools including teleprompter and pacing analysis</li>
            <li>Audio recording and playback capabilities</li>
            <li>Export functionality for various formats (PDF, text, cue cards)</li>
            <li>User account management and speech storage</li>
          </ul>
        </section>

        {/* User Accounts */}
        <section className="terms-section">
          <h2>3. User Accounts</h2>
          
          <h3>Account Creation</h3>
          <p>
            To use our service, you must create an account by providing accurate, complete, and 
            current information. You are responsible for maintaining the confidentiality of your 
            account credentials and for all activities that occur under your account.
          </p>

          <h3>Account Responsibilities</h3>
          <ul>
            <li>Provide accurate and truthful information</li>
            <li>Maintain the security of your password</li>
            <li>Notify us immediately of any unauthorized use</li>
            <li>Be responsible for all activities under your account</li>
            <li>Ensure your contact information remains current</li>
          </ul>

          <h3>Account Termination</h3>
          <p>
            You may terminate your account at any time by contacting our support team. We reserve 
            the right to suspend or terminate accounts that violate these Terms or engage in 
            fraudulent or illegal activities.
          </p>
        </section>

        {/* Payment Terms */}
        <section className="terms-section">
          <h2>4. Payment Terms</h2>
          
          <h3>Pricing and Payment</h3>
          <p>
            Our service is available for a one-time payment of $19, which provides lifetime access 
            to all features. Payment is processed securely through Stripe and other authorized 
            payment processors.
          </p>

          <h3>Refunds</h3>
          <p>
            We offer a 30-day money-back guarantee. If you are not satisfied with our service, 
            you may request a full refund within 30 days of your purchase. Refunds are processed 
            to the original payment method within 5-10 business days.
          </p>

          <h3>Price Changes</h3>
          <p>
            We reserve the right to change our pricing at any time. Price changes will not affect 
            existing customers who have already paid for the service.
          </p>
        </section>

        {/* Acceptable Use */}
        <section className="terms-section">
          <h2>5. Acceptable Use</h2>
          
          <h3>Permitted Uses</h3>
          <p>You may use our service for lawful purposes only, including:</p>
          <ul>
            <li>Creating speeches for personal, professional, or educational purposes</li>
            <li>Using our practice tools to improve your speaking skills</li>
            <li>Exporting speeches in the provided formats</li>
            <li>Sharing speeches with appropriate audiences</li>
          </ul>

          <h3>Prohibited Uses</h3>
          <p>You agree not to use our service for:</p>
          <ul>
            <li>Creating content that is illegal, harmful, or violates any laws</li>
            <li>Generating speeches that promote hate speech, violence, or discrimination</li>
            <li>Attempting to reverse engineer or copy our technology</li>
            <li>Using automated systems to access our service without permission</li>
            <li>Violating any intellectual property rights</li>
            <li>Transmitting viruses, malware, or other harmful code</li>
            <li>Impersonating others or providing false information</li>
          </ul>
        </section>

        {/* Intellectual Property */}
        <section className="terms-section">
          <h2>6. Intellectual Property</h2>
          
          <h3>Our Rights</h3>
          <p>
            The writeaspeech.org platform, including its design, functionality, and underlying 
            technology, is owned by us and protected by intellectual property laws. You may not 
            copy, modify, distribute, or create derivative works without our written permission.
          </p>

          <h3>Your Content</h3>
          <p>
            You retain ownership of the personal stories, information, and content you provide 
            to our service. By using our service, you grant us a limited license to use this 
            content solely for the purpose of providing our services to you.
          </p>

          <h3>Generated Speeches</h3>
          <p>
            Speeches generated by our AI system are provided to you for your personal use. 
            You may use, modify, and distribute these speeches as you see fit, subject to 
            applicable laws and these Terms.
          </p>
        </section>

        {/* Privacy and Data */}
        <section className="terms-section">
          <h2>7. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Our collection, use, and protection of your 
            personal information is governed by our Privacy Policy, which is incorporated 
            into these Terms by reference.
          </p>
        </section>

        {/* Disclaimers */}
        <section className="terms-section">
          <h2>8. Disclaimers</h2>
          
          <h3>Service Availability</h3>
          <p>
            We strive to provide reliable service, but we cannot guarantee uninterrupted 
            access. Our service is provided "as is" and "as available" without warranties 
            of any kind.
          </p>

          <h3>AI-Generated Content</h3>
          <p>
            While our AI strives to generate high-quality speeches, we cannot guarantee 
            that the content will be perfect for your specific needs. You are responsible 
            for reviewing and customizing any generated content before use.
          </p>

          <h3>Third-Party Services</h3>
          <p>
            Our service may integrate with third-party services (such as payment processors). 
            We are not responsible for the availability, content, or practices of these 
            third-party services.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, writeaspeech.org shall not be liable for 
            any indirect, incidental, special, consequential, or punitive damages, including 
            but not limited to loss of profits, data, or use, arising from your use of our 
            service.
          </p>
          <p>
            Our total liability to you for any claims arising from these Terms or your use 
            of our service shall not exceed the amount you paid for the service.
          </p>
        </section>

        {/* Indemnification */}
        <section className="terms-section">
          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless writeaspeech.org, its officers, directors, 
            employees, and agents from any claims, damages, or expenses arising from your use 
            of our service or violation of these Terms.
          </p>
        </section>

        {/* Termination */}
        <section className="terms-section">
          <h2>11. Termination</h2>
          
          <h3>Termination by You</h3>
          <p>
            You may terminate your account and stop using our service at any time by contacting 
            our support team.
          </p>

          <h3>Termination by Us</h3>
          <p>
            We may terminate or suspend your account immediately if you violate these Terms or 
            engage in fraudulent or illegal activities.
          </p>

          <h3>Effect of Termination</h3>
          <p>
            Upon termination, your right to use our service ceases immediately. We may delete 
            your account data in accordance with our Privacy Policy.
          </p>
        </section>

        {/* Governing Law */}
        <section className="terms-section">
          <h2>12. Governing Law and Disputes</h2>
          
          <h3>Governing Law</h3>
          <p>
            These Terms are governed by the laws of the State of California, without regard to 
            conflict of law principles.
          </p>

          <h3>Dispute Resolution</h3>
          <p>
            Any disputes arising from these Terms or your use of our service shall be resolved 
            through binding arbitration in accordance with the rules of the American Arbitration 
            Association.
          </p>
        </section>

        {/* Changes to Terms */}
        <section className="terms-section">
          <h2>13. Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of any material 
            changes by posting the new Terms on our website and updating the "Last updated" 
            date. Your continued use of our service after such changes constitutes acceptance 
            of the new Terms.
          </p>
        </section>

        {/* Severability */}
        <section className="terms-section">
          <h2>14. Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, the 
            remaining provisions will remain in full force and effect.
          </p>
        </section>

        {/* Contact Information */}
        <section className="terms-section">
          <h2>15. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us:</p>
          
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:legal@writeaspeech.org">legal@writeaspeech.org</a></p>
            <p><strong>General Support:</strong> <a href="mailto:support@writeaspeech.org">support@writeaspeech.org</a></p>
            <p><strong>Address:</strong> writeaspeech.org, 123 Speech Street, Communication City, CC 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
// Force rebuild
