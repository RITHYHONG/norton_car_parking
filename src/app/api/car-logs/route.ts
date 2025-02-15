import { NextResponse } from 'next/server'
import { db } from '@/lib/firebaseAdmin'

export async function GET() {
  try {
    const logsRef = db.collection('car-logs')
    const snapshot = await logsRef.get()
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return NextResponse.json(logs)
  } catch (error) {
    console.error('Error fetching car logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch car logs' },
      { status: 500 }
    )
  }
}
