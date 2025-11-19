import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, coin, amount, address } = body

    if (!type || !coin || !amount || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Simulate trade processing
    const transaction = {
      id: `tx_${Date.now()}`,
      type,
      coin,
      amount,
      address,
      status: 'pending',
      timestamp: new Date().toISOString(),
      price: Math.random() * 5000,
    }

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      ...transaction,
      status: 'completed',
      hash: '0x' + Math.random().toString(16).slice(2)
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Trade failed' },
      { status: 500 }
    )
  }
}
