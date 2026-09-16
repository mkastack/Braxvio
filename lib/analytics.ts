// Client-side analytics tracker for Braxvio Partnerships

export type AnalyticsEvent =
  | 'partners_page_view'
  | 'partnership_started'
  | 'partnership_submitted'
  | 'investment_interest_started'
  | 'investment_interest_submitted'
  | 'project_proposal_started'
  | 'project_proposal_submitted'
  | 'product_partnership_clicked';

export function trackPartnershipEvent(event: AnalyticsEvent, payload?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined') {
      // Log for audit and developer visibility
      if (process.env.NODE_ENV !== 'production') {
        console.info(`[Braxvio Analytics] ${event}`, payload || {});
      }

      // Check if custom gtag or analytics handler is attached
      const win = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
      if (typeof win.gtag === 'function') {
        win.gtag('event', event, payload);
      } else if (Array.isArray(win.dataLayer)) {
        win.dataLayer.push({ event, ...payload });
      }
    }
  } catch (err) {
    // Fail silently to never disrupt user experience
  }
}
