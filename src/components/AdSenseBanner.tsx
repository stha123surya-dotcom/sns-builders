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
  slot = "3125630476", // Updated with user's Ad slot ID
  format = "auto",
  responsive = true
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let observer: ResizeObserver | null = null;
    let adPushed = false;
    
    const pushAd = () => {
      try {
        if (!adPushed && adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
          // Verify actual width
          const width = adRef.current.offsetWidth || adRef.current.parentElement?.offsetWidth || 0;
          if (width > 0) {
            adPushed = true;
            const win = window as any;
            (win.adsbygoogle = win.adsbygoogle || []).push({});
            if (observer) {
              observer.disconnect();
            }
          }
        }
      } catch (e) {
        // Ignoring specific known AdSense errors which are benign in dev/SPA environments
        if (e instanceof Error && !e.message.includes('already have ads')) {
          console.error("AdSense error:", e);
        }
      }
    };

    if (adRef.current && adRef.current.parentElement) {
       // Only push if the container has an actual width to prevent 'No slot size for availableWidth=0'
       const parent = adRef.current.parentElement;
       if (parent.offsetWidth > 0) {
         timeoutId = setTimeout(pushAd, 300);
       } else {
         observer = new ResizeObserver(() => {
           if (parent.offsetWidth > 0 && !adPushed) {
             timeoutId = setTimeout(pushAd, 300);
           }
         });
         observer.observe(parent);
       }
    }

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
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
