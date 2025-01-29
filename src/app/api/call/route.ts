import { NextResponse } from 'next/server';
import { serverEnv } from '@/lib/env.server';
import { generateCallScript } from '@/services/bland/prompts/call-script';
import { BLAND_CONFIG } from '@/services/bland/config';

export async function POST(request: Request) {
  try {
    const { phoneNumber, businessInfo } = await request.json();

    if (!phoneNumber || !businessInfo) {
      return NextResponse.json(
        { error: 'Phone number and business info are required' },
        { status: 400 }
      );
    }

    const script = generateCallScript(businessInfo);

    const response = await fetch(`${serverEnv.BLAND_API_URL}/v1/calls`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serverEnv.BLAND_API_KEY}`
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        task: script,
        voice_id: BLAND_CONFIG.VOICE.VOICE_ID,
        temperature: BLAND_CONFIG.VOICE.TEMPERATURE,
        reduce_latency: BLAND_CONFIG.VOICE.REDUCE_LATENCY,
        max_duration: BLAND_CONFIG.CALL.MAX_DURATION,
        end_on_silence: BLAND_CONFIG.CALL.END_ON_SILENCE,
        silence_timeout: BLAND_CONFIG.CALL.SILENCE_TIMEOUT,
        record: BLAND_CONFIG.CALL.RECORD
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: error.message || 'Failed to initiate call' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error initiating call:', error);
    return NextResponse.json(
      { error: 'Failed to initiate call' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const callId = searchParams.get('callId');

    if (!callId) {
      return NextResponse.json(
        { error: 'Call ID is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${serverEnv.BLAND_API_URL}/v1/calls/${callId}`, {
      headers: {
        'Authorization': `Bearer ${serverEnv.BLAND_API_KEY}`
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to get call status' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error getting call status:', error);
    return NextResponse.json(
      { error: 'Failed to get call status' },
      { status: 500 }
    );
  }
} 