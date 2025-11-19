'use client'

interface Transaction {
  id: string
  type: 'buy' | 'sell'
  coin: string
  amount: number
  price: number
  total: number
  date: string
  status: 'completed' | 'pending'
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  return (
    <div className="card-base p-6 space-y-4">
      <h2 className="text-xl font-bold">Transaction History</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[color:var(--color-border)]">
              <th className="text-left py-3 text-[color:var(--color-text-secondary)]">Type</th>
              <th className="text-left py-3 text-[color:var(--color-text-secondary)]">Coin</th>
              <th className="text-right py-3 text-[color:var(--color-text-secondary)]">Amount</th>
              <th className="text-right py-3 text-[color:var(--color-text-secondary)]">Price</th>
              <th className="text-right py-3 text-[color:var(--color-text-secondary)]">Total</th>
              <th className="text-right py-3 text-[color:var(--color-text-secondary)]">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:var(--color-border)]">
            {transactions.map(tx => (
              <tr key={tx.id} className="hover:bg-[color:var(--color-surface-light)] transition-colors">
                <td className="py-4">
                  <span className={`px-2 py-1 rounded font-semibold text-xs ${
                    tx.type === 'buy'
                      ? 'bg-[color:var(--color-accent)] bg-opacity-20 text-[color:var(--color-accent)]'
                      : 'bg-red-600 bg-opacity-20 text-red-400'
                  }`}>
                    {tx.type.toUpperCase()}
                  </span>
                </td>
                <td className="py-4">{tx.coin}</td>
                <td className="py-4 text-right">{tx.amount}</td>
                <td className="py-4 text-right">${tx.price.toLocaleString()}</td>
                <td className="py-4 text-right font-semibold">${tx.total.toLocaleString()}</td>
                <td className="py-4 text-right text-[color:var(--color-text-tertiary)]">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
