import { NextResponse } from 'next/server';
import { adminDb } from '../../../lib/firebaseAdmin';

export async function GET(request: Request) {
  try {
    const snapshot = await adminDb.collection('carLogs').get();
    const carLogs = snapshot.docs.map(doc => doc.data());
    return NextResponse.json(carLogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching car logs:', error);
    return NextResponse.json({ error: 'Failed to fetch car logs' }, { status: 500 });
  }
}
