import { useEffect, useState } from "react";
import Client, { waitForClient } from "wsnet-client"

export type Status = "loading" | "failed" | "sucess"

export function useClient(getNewClient: () => Client, wait = true, setOnCloseHandeler = true): [null | Client, Status, () => Promise<void>, boolean] {
    const [client, setClient] = useState(null as null | Client)
    const [state, setState] = useState("loading" as Status)
    const [isClosed, setIsClosed] = useState(false as boolean)

    async function createClient() {
        setState("loading")
        setIsClosed(false)

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
            setIsClosed(true)
        }

        if (setOnCloseHandeler)
            new_client.onclose = () => setIsClosed(true)
    }

    useEffect(() => {
        createClient()
        return () => {
            if (client)
                client.close()
        }
    }, [])

    return [client, state, createClient, isClosed]
}