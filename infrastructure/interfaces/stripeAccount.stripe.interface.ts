export interface StripeAccountStripeInterface {
    id: string;
    object: string;
    applied_configurations: string[];
    closed: boolean;
    configuration: {
			customer: null,
			merchant: null,
			recipient: {
				applied: boolean,
				capabilities: {
					stripe_balance: {
						payouts: {
							status: string,
							status_details: []
						},
						stripe_transfers: {
							status: string,
							status_details: []
						}
					}
				}
			}
		},
		contact_email: string,
		contact_phone: string | null,
		created: string,
		dashboard: string,
		identity: null,
		defaults: null,
		display_name: string,
		future_requirements: null,
		metadata: Record<string, any>;
		requirements: {
			entries: {
				awaiting_action_from: string;
				description: string;
				errors: {
					code: string;
					description: string;
				}[];
				impact: {
					restricts_capabilities: {
						capability: string;
						configuration: string;
						deadline: {
							status: string;
						};
					}[];
				};
				minimum_deadline: {
					status: string;
				};
				reference: string | null;
				requested_reasons: {
					code: string;
				}[];
			}[];
			summary: {
				minimum_deadline: {
					status: string;
					time: string | null;
				};
			};
		} | null;
		livemode: boolean;
}