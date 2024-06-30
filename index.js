import { useEffect, useState } from "react";
import Client, { waitForClient } from "wsnet-client"

export function useClient(getNewClient = () => new Client(), wait = true, setOnCloseHandeler = true) {
    const [client, setClient] = useState(null)
    const [state, setState] = useState("loading")
    const [isClosed, setIsClosed] = useState(false)

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