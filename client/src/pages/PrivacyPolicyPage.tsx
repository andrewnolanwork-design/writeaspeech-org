const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="page-container">
      <div className="container">
        {/* Header Section */}
        <section className="privacy-header">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">
            Last updated: December 2024
          </p>
        </section>

        {/* Introduction */}
        <section className="privacy-intro">
          <p>
            At writeaspeech.org, we are committed to protecting your privacy and ensuring the security 
            of your personal information. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our website and services.
          </p>
          <p>
            By using our service, you agree to the collection and use of information in accordance 
            with this policy. If you do not agree with our policies and practices, please do not 
            use our service.
          </p>
        </section>

        {/* Information We Collect */}
        <section className="privacy-section">
          <h2>Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
            <li><strong>Profile Information:</strong> Any additional information you choose to provide in your profile</li>
            <li><strong>Payment Information:</strong> Billing address and payment method details (processed securely through Stripe)</li>
            <li><strong>Speech Content:</strong> The speeches you create, including personal stories and details you provide</li>
            <li><strong>Communication Data:</strong> Messages you send to our support team</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>We automatically collect certain information when you use our service:</p>
          <ul>
            <li><strong>Usage Data:</strong> How you interact with our website, features used, and time spent</li>
            <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
            <li><strong>Cookies and Tracking:</strong> Information collected through cookies and similar technologies</li>
            <li><strong>Log Data:</strong> Server logs including access times, pages viewed, and referring URLs</li>
          </ul>
        </section>

        {/* How We Use Information */}
        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          
          <h3>Service Provision</h3>
          <ul>
            <li>Generate personalized speeches based on your input and preferences</li>
            <li>Provide access to our speech writing tools and features</li>
            <li>Process payments and manage your account</li>
            <li>Deliver customer support and respond to your inquiries</li>
          </ul>

          <h3>Service Improvement</h3>
          <ul>
            <li>Analyze usage patterns to improve our AI algorithms</li>
            <li>Enhance user experience and develop new features</li>
            <li>Conduct research and analytics to better understand user needs</li>
            <li>Test and optimize our platform performance</li>
          </ul>

          <h3>Communication</h3>
          <ul>
            <li>Send important updates about your account or our service</li>
            <li>Provide customer support and respond to your requests</li>
            <li>Send marketing communications (only with your consent)</li>
            <li>Notify you about changes to our terms or privacy policy</li>
          </ul>
        </section>

        {/* Information Sharing */}
        <section className="privacy-section">
          <h2>Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          
          <h3>Service Providers</h3>
          <p>We may share information with trusted third-party service providers who assist us in operating our platform:</p>
          <ul>
            <li><strong>OpenAI:</strong> For AI-powered speech generation (your personal details are anonymized)</li>
            <li><strong>Stripe:</strong> For secure payment processing</li>
            <li><strong>Firebase:</strong> For user authentication and data storage</li>
            <li><strong>Vercel:</strong> For website hosting and performance optimization</li>
          </ul>

          <h3>Legal Requirements</h3>
          <p>We may disclose your information if required by law or in response to:</p>
          <ul>
            <li>Valid legal requests from government authorities</li>
            <li>Court orders or subpoenas</li>
            <li>Legal proceedings where disclosure is necessary</li>
            <li>Protection of our rights, property, or safety</li>
          </ul>

          <h3>Business Transfers</h3>
          <p>In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction, but will remain subject to this privacy policy.</p>
        </section>

        {/* Data Security */}
        <section className="privacy-section">
          <h2>Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
          
          <h3>Technical Safeguards</h3>
          <ul>
            <li><strong>Encryption:</strong> All data is encrypted in transit and at rest using industry-standard protocols</li>
            <li><strong>Access Controls:</strong> Strict access controls limit who can view your personal information</li>
            <li><strong>Secure Infrastructure:</strong> Our servers are hosted on secure, monitored platforms</li>
            <li><strong>Regular Updates:</strong> We regularly update our security measures and software</li>
          </ul>

          <h3>Operational Safeguards</h3>
          <ul>
            <li><strong>Employee Training:</strong> All team members are trained on data protection best practices</li>
            <li><strong>Data Minimization:</strong> We only collect and retain information necessary for our services</li>
            <li><strong>Regular Audits:</strong> We conduct regular security audits and assessments</li>
            <li><strong>Incident Response:</strong> We have procedures in place to respond to any security incidents</li>
          </ul>
        </section>

        {/* Your Rights */}
        <section className="privacy-section">
          <h2>Your Rights and Choices</h2>
          <p>You have certain rights regarding your personal information:</p>
          
          <h3>Access and Portability</h3>
          <ul>
            <li>Request a copy of your personal information</li>
            <li>Export your speech data in a portable format</li>
            <li>View and update your account information</li>
          </ul>

          <h3>Correction and Deletion</h3>
          <ul>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your personal information</li>
            <li>Close your account and remove associated data</li>
          </ul>

          <h3>Communication Preferences</h3>
          <ul>
            <li>Opt out of marketing communications</li>
            <li>Choose how you receive notifications</li>
            <li>Update your communication preferences at any time</li>
          </ul>

          <p>
            To exercise these rights, please contact us at <a href="mailto:privacy@writeaspeech.org">privacy@writeaspeech.org</a>. 
            We will respond to your request within 30 days.
          </p>
        </section>

        {/* Cookies and Tracking */}
        <section className="privacy-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar technologies to enhance your experience:</p>
          
          <h3>Types of Cookies</h3>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how you use our service</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
            <li><strong>Marketing Cookies:</strong> Used for targeted advertising (with consent)</li>
          </ul>

          <h3>Managing Cookies</h3>
          <p>
            You can control cookies through your browser settings. However, disabling certain cookies 
            may affect the functionality of our service. For more information about our cookie usage, 
            please contact us.
          </p>
        </section>

        {/* Data Retention */}
        <section className="privacy-section">
          <h2>Data Retention</h2>
          <p>We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy:</p>
          
          <ul>
            <li><strong>Account Information:</strong> Retained while your account is active and for 3 years after closure</li>
            <li><strong>Speech Content:</strong> Retained while your account is active, deleted upon account closure</li>
            <li><strong>Payment Information:</strong> Retained as required by law and payment processors</li>
            <li><strong>Usage Data:</strong> Retained for up to 2 years for analytics and service improvement</li>
          </ul>
        </section>

        {/* International Transfers */}
        <section className="privacy-section">
          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your own. 
            We ensure that such transfers comply with applicable data protection laws and implement 
            appropriate safeguards to protect your information.
          </p>
        </section>

        {/* Children's Privacy */}
        <section className="privacy-section">
          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13 years of age. We do not knowingly 
            collect personal information from children under 13. If we become aware that we have 
            collected personal information from a child under 13, we will take steps to delete 
            such information promptly.
          </p>
        </section>

        {/* Changes to Policy */}
        <section className="privacy-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes 
            by posting the new Privacy Policy on this page and updating the "Last updated" date. 
            We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        {/* Contact Information */}
        <section className="privacy-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:privacy@writeaspeech.org">privacy@writeaspeech.org</a></p>
            <p><strong>General Support:</strong> <a href="mailto:support@writeaspeech.org">support@writeaspeech.org</a></p>
            <p><strong>Address:</strong> writeaspeech.org, 123 Speech Street, Communication City, CC 12345</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
