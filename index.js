import { useEffect, useState } from "react";
import Client, { waitForClient } from "wsnet-client"

export function useClient(client = new Client()) {
    const [client, setClient] = useState(null)
    const [state, setState] = useState("loading")

    async function createClient() {
        if (client) {
            client.close()
        }

        const clientState = await waitForClient(client)
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