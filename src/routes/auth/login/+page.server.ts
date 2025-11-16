import type { Actions } from "./$types"
import { redirect } from "@sveltejs/kit"

export const actions: Actions = {
    login: async ({ request }) => {
        const formdata = await request.formData()
        console.log(formdata)
        redirect(303, "/")
    }
}