'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { contractClient } from '@/lib/contract-client';

interface CoinDetailsPanelProps {
  coinAddress: string;
}

export function CoinDetailsPanel({ coinAddress }: CoinDetailsPanelProps) {
  const { address: walletAddress } = useAccount();
  const [details, setDetails] = useState<any>(null);
  const [userBalance, setUserBalance] = useState('0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const coinDetails = await contractClient.getCoinDetails(coinAddress);
        setDetails(coinDetails);

        if (walletAddress) {
          const balance = await contractClient.getTokenBalance(coinAddress, walletAddress);
          setUserBalance(balance.balance || '0');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
        setError(errorMessage);
        console.error('[v0] Error loading coin details:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [coinAddress, walletAddress]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-700">Error Loading Coin</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{details?.name || 'Unknown Token'}</CardTitle>
            <CardDescription>{details?.creatorName || 'Unknown Creator'}</CardDescription>
          </div>
          <Badge variant="outline">{details?.symbol || 'N/A'}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">{details?.tokenPrice || '0'} ETH</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Your Balance</p>
            <p className="text-lg font-semibold">{userBalance.slice(0, 8)} tokens</p>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Contract Address</p>
          <p className="text-xs font-mono text-muted-foreground break-all">
            {coinAddress}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
