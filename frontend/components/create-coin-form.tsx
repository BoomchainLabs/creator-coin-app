'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function CreateCoinForm() {
  const { address: walletAddress } = useAccount();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    initialSupply: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!walletAddress) {
      setError('Please connect your wallet');
      return;
    }

    if (!formData.name || !formData.symbol || !formData.initialSupply) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      console.log('[v0] Creating new creator coin:', formData);
      
      // For now, simulating the flow
      setTimeout(() => {
        setSuccess('Creator coin deployment initiated! Check your wallet for the transaction.');
        setFormData({ name: '', symbol: '', description: '', initialSupply: '' });
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create coin';
      setError(errorMessage);
      console.error('[v0] Error creating coin:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Creator Coin</CardTitle>
        <CardDescription>
          Deploy a new ERC-20 token on Base network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Coin Name *</label>
            <Input
              name="name"
              placeholder="My Creator Coin"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Symbol *</label>
            <div className="flex gap-2">
              <Input
                name="symbol"
                placeholder="MCC"
                value={formData.symbol}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={6}
              />
              <Badge variant="outline">{formData.symbol.toUpperCase()}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              name="description"
              placeholder="What is your creator coin about?"
              value={formData.description}
              onChange={handleChange}
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Initial Supply *</label>
            <Input
              name="initialSupply"
              type="number"
              placeholder="1000000"
              value={formData.initialSupply}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-700">
              {success}
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || !walletAddress}
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : walletAddress ? 'Create Coin' : 'Connect Wallet'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
