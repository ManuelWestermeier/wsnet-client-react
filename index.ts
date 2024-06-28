import { useEffect, useState } from "react";
import Client, { waitForClient } from "wsnet-client"

type Status = "loading" | "failed" | "sucess"

export function useClient(getNewClient: () => Client, wait = true): [null | Client, Status, () => Promise<void>] {
    const [client, setClient] = useState(null)
    const [state, setState] = useState<Status>("loading")

    async function createClient() {
        if (client) {
            client.close()
        }

        const new_client = getNewClient()

        const clientState = wait ?
            await waitForClient(new_client) :
            true

        if (clientState) {
            setState("sucess")
            setClient(new_client)
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