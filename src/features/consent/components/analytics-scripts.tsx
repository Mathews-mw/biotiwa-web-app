'use client';

import Script from 'next/script';
import { useEffect } from 'react';

import type { IConsentPreferences } from '../types/consent';

type AnalyticsScriptsProps = {
	preferences: IConsentPreferences | null;
};

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
		clarity?: (...args: unknown[]) => void;
	}
}

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function AnalyticsScripts({ preferences }: AnalyticsScriptsProps) {
	const analyticsAllowed = preferences?.analytics === true;
	const marketingAllowed = preferences?.marketing === true;

	useEffect(() => {
		if (!preferences) {
			return;
		}

		if (typeof window.gtag === 'function') {
			window.gtag('consent', 'update', {
				analytics_storage: analyticsAllowed ? 'granted' : 'denied',
				ad_storage: marketingAllowed ? 'granted' : 'denied',
				ad_user_data: marketingAllowed ? 'granted' : 'denied',
				ad_personalization: marketingAllowed ? 'granted' : 'denied',
			});
		}

		if (typeof window.clarity === 'function') {
			window.clarity('consentv2', {
				ad_Storage: marketingAllowed ? 'granted' : 'denied',
				analytics_Storage: analyticsAllowed ? 'granted' : 'denied',
			});

			if (!analyticsAllowed) {
				window.clarity('consent', false);
			}
		}
	}, [preferences, analyticsAllowed, marketingAllowed]);

	if (!analyticsAllowed) {
		return null;
	}

	return (
		<>
			{gaMeasurementId ? (
				<>
					<Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />

					<Script id="ga4-init" strategy="afterInteractive">
						{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;

              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: '${marketingAllowed ? 'granted' : 'denied'}',
                ad_user_data: '${marketingAllowed ? 'granted' : 'denied'}',
                ad_personalization: '${marketingAllowed ? 'granted' : 'denied'}'
              });

              gtag('js', new Date());

              gtag('config', '${gaMeasurementId}', {
                anonymize_ip: true
              });
            `}
					</Script>
				</>
			) : null}

			{clarityProjectId ? (
				<Script id="clarity-init" strategy="afterInteractive">
					{`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");

            window.clarity('consentv2', {
              ad_Storage: '${marketingAllowed ? 'granted' : 'denied'}',
              analytics_Storage: 'granted'
            });
          `}
				</Script>
			) : null}
		</>
	);
}
