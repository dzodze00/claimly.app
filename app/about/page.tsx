export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">About Claimly</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700">
            At Claimly, our mission is to empower consumers by helping them recover compensation they're legally entitled to through class action settlements.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700">
            Claimly was founded in 2023 by a team of legal tech experts who recognized that billions of dollars in class action settlements go unclaimed each year.
          </p>
        </section>
      </div>
    </div>
  )
}
