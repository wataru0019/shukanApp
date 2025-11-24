// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import { Session, SupabaseClient } from '@supabase/supabase-js'

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			supabase: SupabaseClient
			safeGetSession: () => Promise<{ session: Session | null }>
			session: Session | null
		}
		interface PageData {
			session: Session | null
		}
	}
}

export { };
