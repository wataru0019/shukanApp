import type { Actions } from "./$types"
import { redirect } from "@sveltejs/kit"

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const formdata = await request.formData()
        const name = formdata.get('name') as string
        const email = formdata.get('mail') as string
        const password = formdata.get('password') as string

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    user_name: name,
                }
            }
        })

        console.log(error)

        if (error) {
            return {
                error: error.message
            }
        }

        console.log("Login successful")

        redirect(303, "/")
    }
}