import { useEffect } from 'react';
import './LaunchGate.css';

export default function LaunchGate() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'ÇOK YAKINDA';
    return () => { document.title = previousTitle; };
  }, []);

  return (
    <main className="launch-gate">
      <h1>ÇOK YAKINDA</h1>
    </main>
  );
}
