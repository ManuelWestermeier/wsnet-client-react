import { useEffect, useState } from "react";
import Client, { waitForClient } from "wsnet-client"

export function useClient(url = "", params = {}, wait = true) {
    const [client, setClient] = useState(null)
    const [state, setState] = useState("loading")

    async function createClient() {
        if (client) {
            client.close()
        }

        const client = new Client(url, params)

        const clientState = wait ?
            await waitForClient(client) :
            true

        if (clientState) {
            setState("sucess")
            setClient(client)
        }
        else {
            setState("failed")
        }
    }

    useEffect(() => {
        createClient()
        return () => {
            if (client)
                client.close()
        }
    }, [])

    return [client, state, createClient]
}