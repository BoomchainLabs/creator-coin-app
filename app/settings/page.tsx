'use client'

import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import { useWallet } from '@/lib/wallet-context'
import { useState } from 'react'

export default function SettingsPage() {
  const { address } = useWallet()
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: true,
    twoFactor: false,
    theme: 'dark',
  })

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }))
  }

  return (
    <main className="w-full">
      <Navigation />

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>Manage your account and preferences</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Settings menu */}
            <div className="card-base p-4 space-y-2 h-fit">
              {['Account', 'Security', 'Notifications', 'Preferences'].map(section => (
                <button
                  key={section}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-light)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  }}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Settings content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Account section */}
              <div className="card-base p-8 space-y-6">
                <h2 className="text-2xl font-bold">Account</h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Wallet Address
                    </label>
                    <div className="mt-2 px-4 py-3 rounded-lg font-mono text-sm break-all" style={{ backgroundColor: 'var(--color-surface-light)' }}>
                      {address || 'Not connected'}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="your_username"
                      className="mt-2 w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                      style={{
                        backgroundColor: 'var(--color-surface-light)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="mt-2 w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none"
                      style={{
                        backgroundColor: 'var(--color-surface-light)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-primary)'}
                      onBlur={(e) => e.currentTarget.style.borderColor = 'var(--color-border)'}
                    />
                  </div>
                </div>
              </div>

              {/* Security section */}
              <div className="card-base p-8 space-y-6">
                <h2 className="text-2xl font-bold">Security</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Two-Factor Authentication</div>
                      <div className="text-sm text-[color:var(--color-text-tertiary)]">Add an extra layer of security</div>
                    </div>
                    <button
                      onClick={() => handleToggle('twoFactor')}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                        settings.twoFactor ? 'bg-[color:var(--color-accent)]' : 'bg-[color:var(--color-surface-light)]'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                          settings.twoFactor ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <button className="btn-secondary w-full">
                    Change Password
                  </button>
                </div>
              </div>

              {/* Notifications section */}
              <div className="card-base p-8 space-y-6">
                <h2 className="text-2xl font-bold">Notifications</h2>

                <div className="space-y-4">
                  {[
                    { key: 'notifications', label: 'In-App Notifications', desc: 'Receive notifications about price changes and trades' },
                    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive email notifications about important updates' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{item.label}</div>
                        <div className="text-sm text-[color:var(--color-text-tertiary)]">{item.desc}</div>
                      </div>
                      <button
                        onClick={() => handleToggle(item.key as keyof typeof settings)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          settings[item.key as keyof typeof settings] ? 'bg-[color:var(--color-accent)]' : 'bg-[color:var(--color-surface-light)]'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            settings[item.key as keyof typeof settings] ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save button */}
              <button className="btn-primary w-full">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
