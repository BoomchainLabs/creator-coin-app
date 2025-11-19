import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t" style={{ borderTopColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <span className="text-white font-bold">CC</span>
              </div>
              <span className="font-bold">Creator Coin</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
              The decentralized marketplace for creator assets
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Product</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li><Link href="#" className="transition-colors hover:opacity-80">Marketplace</Link></li>
              <li><Link href="#" className="transition-colors hover:opacity-80">Dashboard</Link></li>
              <li><Link href="#" className="transition-colors hover:opacity-80">Creators</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li><Link href="#" className="transition-colors hover:opacity-80">About</Link></li>
              <li><Link href="#" className="transition-colors hover:opacity-80">Blog</Link></li>
              <li><Link href="#" className="transition-colors hover:opacity-80">Careers</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li><Link href="#" className="transition-colors hover:opacity-80">Privacy</Link></li>
              <li><Link href="#" className="transition-colors hover:opacity-80">Terms</Link></li>
              <li><Link href="#" className="transition-colors hover:opacity-80">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col sm:flex-row justify-between items-center text-sm" style={{ borderTopColor: 'var(--color-border)', color: 'var(--color-text-tertiary)' }}>
          <p>&copy; 2025 Creator Coin. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="transition-colors hover:opacity-80">Twitter</Link>
            <Link href="#" className="transition-colors hover:opacity-80">Discord</Link>
            <Link href="#" className="transition-colors hover:opacity-80">Github</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
