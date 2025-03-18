export default function FAQPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-2">What is a class action lawsuit?</h3>
          <p className="text-gray-700">
            A class action lawsuit is a legal proceeding where a group of people with similar injuries caused by the
            same product or action sue the defendant as a group. These lawsuits allow courts to manage cases that would
            be uneconomical to litigate individually.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">How does Claimly find settlements I'm eligible for?</h3>
          <p className="text-gray-700">
            Claimly analyzes your purchase history, account information, and other relevant data to match you with
            settlements where you meet the eligibility criteria. Our system continuously updates with new settlements to
            ensure you don't miss out on potential claims.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">How much does it cost to use Claimly?</h3>
          <p className="text-gray-700">
            Claimly operates on a points-based system. You receive free points when you sign up, and you can purchase
            additional points as needed. Each claim filing requires a certain number of points, depending on the
            complexity of the settlement.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">How long does it take to receive settlement money?</h3>
          <p className="text-gray-700">
            The timeline varies by settlement. Some settlements distribute funds within a few months, while others may
            take a year or more. Claimly keeps you updated on the status of your claims and notifies you when payments
            are expected.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Is my personal information secure?</h3>
          <p className="text-gray-700">
            Yes, Claimly employs industry-standard security measures to protect your personal information. We use
            encryption, secure data storage, and strict access controls to ensure your data remains private and secure.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-2">Can I file claims for past purchases or incidents?</h3>
          <p className="text-gray-700">
            Yes, many settlements cover past purchases or incidents within a specific time period. Claimly helps you
            identify these opportunities and file claims for eligible past events, even if they occurred several years
            ago.
          </p>
        </div>
      </div>
    </div>
  )
}

