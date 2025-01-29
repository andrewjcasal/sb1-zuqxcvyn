interface ConnectivityResult {
  isOnline: boolean;
  latency?: number;
  error?: string;
}

export async function checkConnectivity(): Promise<ConnectivityResult> {
  if (!navigator.onLine) {
    return { 
      isOnline: false,
      error: 'No internet connection detected'
    };
  }

  return {
    isOnline: true
  };
}