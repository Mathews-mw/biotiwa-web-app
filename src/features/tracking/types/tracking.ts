export type IFunnelEventType =
	| 'product_viewed'
	| 'market_changed'
	| 'offer_selected'
	| 'order_bump_changed'
	| 'checkout_started'
	| 'checkout_submitted'
	| 'purchase_completed';

export type ITrackEventInput = {
	eventType: IFunnelEventType;
	sessionId: string;
	market?: 'BR' | 'US';
	payload?: Record<string, unknown>;
};
