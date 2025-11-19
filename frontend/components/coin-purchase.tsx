'use client';

import { useState } from 'react';
import { useAccount, useWalletClient } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { contractClient } from '@/lib/contract-client';

interface CoinPurchaseProps {
  coinAddress: string;
  coinName: string;
  tokenPrice: string;
}

export function CoinPurchase({ coinAddress, coinName, tokenPrice }: CoinPurchaseProps) {
  const { address: walletAddress } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [ethAmount, setEthAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [txHash, setTxHash] = useState('');
  const [balance, setBalance] = useState('');

  const loadBalance = async () => {
    if (!walletAddress) return;
    try {
      const { ethBalance } = await contractClient.getEthBalance(walletAddress);
      setBalance(ethBalance);
    } catch (err) {
      console.error('[v0] Error loading balance:', err);
    }
  };

  const estimatedTokens = ethAmount ? (parseFloat(ethAmount) / parseFloat(tokenPrice)).toFixed(4) : '0';

  const handlePurchase = async () => {
    if (!walletAddress || !walletClient) {
      setError('Please connect your wallet');
      return;
    }

    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('[v0] Initiating token purchase:', { coinAddress, ethAmount });
      
      // This would integrate with wagmi's contract write hook
      // For now, simulating the flow
      const txHash = '0x' + Math.random().toString(16).slice(2);
      setTxHash(txHash);
      
      // Check transaction status
      setTimeout(async () => {
        try {
          const status = await contractClient.getTransactionStatus(txHash);
          console.log('[v0] Transaction status:', status);
        } catch (err) {
          console.error('[v0] Error checking transaction status:', err);
        }
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMessage);
      console.error('[v0] Purchase error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Buy {coinName}</CardTitle>
        <CardDescription>
          Token Price: {tokenPrice} ETH | Your Balance: {balance || 'Loading...'} ETH
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (ETH)</label>
          <Input
            type="number"
            placeholder="0.1"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            disabled={isLoading}
          />
          <p className="text-xs text-muted-foreground">
            You will receive approximately {estimatedTokens} tokens
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {error}
          </div>
        )}

        {txHash && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
            Transaction pending: {txHash.slice(0, 10)}...
          </div>
        )}

        <Button
          onClick={handlePurchase}
          disabled={isLoading || !walletAddress}
          className="w-full"
        >
          {isLoading ? 'Processing...' : walletAddress ? 'Buy Tokens' : 'Connect Wallet'}
        </Button>
      </CardContent>
    </Card>
  );
}
