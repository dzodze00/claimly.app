export default function HowItWorksPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">How It Works</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Finding Eligible Settlements</h2>
          <p className="text-gray-700">
            Claimly uses advanced algorithms to scan your digital footprint and match you with class action settlements
            you may be eligible for. Our system analyzes your purchase history, account information, and other relevant
            data to identify potential claims.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Filing Your Claims</h2>
          <p className="text-gray-700">
            Once we've identified eligible settlements, you can select which claims you want to file. Our platform
            streamlines the filing process, handling all the paperwork and submission requirements on your behalf.
            You'll earn points for each successful claim filed.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Tracking Your Claims</h2>
          <p className="text-gray-700">
            After filing, you can track the status of your claims through your dashboard. We'll keep you updated on
            important developments, settlement timelines, and payment information. Our goal is to make the entire
            process transparent and hassle-free.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Getting Paid</h2>
          <p className="text-gray-700">
            When a settlement is approved and payments are distributed, you'll receive your compensation directly.
            Depending on the settlement terms, this may be through direct deposit, check, or digital payment methods.
            Claimly makes it easy to track and receive your rightful compensation.
          </p>
        </section>
      </div>
    </div>
  )
}

