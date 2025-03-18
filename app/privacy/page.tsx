export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700">
            Claimly collects personal information that you provide directly to us, such as your name, email address,
            phone number, and mailing address. We also collect information about your digital footprint to identify
            eligible settlements, including purchase history and account information with your explicit consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-700">
            We use your information to match you with eligible class action settlements, file claims on your behalf,
            communicate with you about your claims, and improve our services. We do not sell your personal information
            to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-700">
            Claimly implements appropriate security measures to protect your personal information from unauthorized
            access, alteration, disclosure, or destruction. We use encryption, secure data storage, and strict access
            controls to safeguard your data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, correct, or delete your personal information. You can also opt out of certain
            data collection practices. To exercise these rights, please contact us through our support channels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this privacy policy from time to time to reflect changes in our practices or for other
            operational, legal, or regulatory reasons. We will notify you of any material changes to this policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about our privacy practices, please contact us at privacy@claimly.com.
          </p>
        </section>
      </div>
    </div>
  )
}

