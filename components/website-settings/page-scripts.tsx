import { GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";

export const PageScripts = async () => {
  const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!googleTagManagerId || !clarityId) {
    console.log("Error while fetching google tag manager id or clarity id");
    return null;
  }
  return (
    <>
      {/* {settings.metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.metaPixelId}');
            fbq('track', 'PageView');
          `,
          }}
        />
      )} */}
      {googleTagManagerId && <GoogleTagManager gtmId={googleTagManagerId} />}
      {/* {settings.googleAnalyticsId && (
        <GoogleAnalytics gaId={settings.googleAnalyticsId} />
      )}
      {settings.footerHTML && (
        <div dangerouslySetInnerHTML={{ __html: settings.footerHTML }} />
      )} */}
      <Script
        id="ms-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
               c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
               t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
               y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `,
        }}
      />
    </>
  );
};
