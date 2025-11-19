export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Connect Wallet',
      description: 'Link your Web3 wallet to get started on the platform'
    },
    {
      number: '02',
      title: 'Browse Creators',
      description: 'Explore thousands of creator coins and their performance'
    },
    {
      number: '03',
      title: 'Trade Assets',
      description: 'Buy and sell creator coins with instant settlement'
    },
    {
      number: '04',
      title: 'Earn Rewards',
      description: 'Gain returns from your creator investments and referrals'
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-[color:var(--color-text-secondary)]">
            Get started trading creator coins in 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Line connector */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-surface-light)]"></div>
              )}

              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-[color:var(--color-text-secondary)]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
