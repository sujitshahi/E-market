'use client';
interface ErrorProps {
  error: Error & { digest?: string }; 
  reset: () => void; 
}

export default function error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>{error.message}</h1>
      <button type="button" onClick={reset}>Reset</button>
    </div>
  )
}