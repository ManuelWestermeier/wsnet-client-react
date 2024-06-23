import { useEffect, useState } from "react";
import Client, { waitForClient } from "wsnet-client"

export function useClient(url, params) {
    const [client, setClient] = useState(null)
    const [state, setState] = useState("loading")

    async function createClient() {
        if (client) {
            client.close()
        }

        const clientState = await waitForClient(new Client(url, params))
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