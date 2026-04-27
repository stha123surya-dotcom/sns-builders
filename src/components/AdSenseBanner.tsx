import { useEffect, useRef } from 'react';

interface AdSenseBannerProps {
  className?: string;
  client?: string;
  slot?: string;
  format?: string;
  responsive?: boolean;
}

export function AdSenseBanner({ 
  className = "", 
  client = "ca-pub-4769306486288330", 
  slot = "1234567890", // Provide a default/placeholder Ad slot ID
  format = "auto",
  responsive = true
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && !adRef.current.hasChildNodes()) {
        const win = window as any;
        (win.adsbygoogle = win.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`overflow-hidden flex justify-center items-center bg-surface border border-border shadow-sm rounded-3xl p-4 text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      {/* Fallback space visualizing the Ad unit during development when AdSense script doesn't render an ad */}
      <span className="absolute text-muted-foreground/50 text-sm font-medium tracking-wide">Advertisement</span>
    </div>
  );
}
