# wsnet-client-react

## Basic Usage

```jsx
import Client from "wsnet-client"
import { useClient } from "wsnet-client-react"

function App() {
    const [counter, setCounter] = useState(0)
    
    //1. The client or null
    //2. the state: "loading", "sucess" or "failed"
    const [client, state, reCreateClient] = useClient(
/*the argument 1 is the function to get the client (it have tu return a new client)*/
        () => {
        const client = new Client("", { user: "admin", password: "1234" })
        //any client "on" logic (all onSay and onGet handeler)
        client.onSay("set-counter", data => setCounter(data))

        return client
    }, /*argument 2 is wait for client to open (boolean) (default is to wait for client to open = true)*/ true)

    if (state == "")
        return <button onClick={() => reCreateClient()}>
            Reconect
        </button>

    if (!client)
        return state

    return <>
        <h1>
            counter: {counter}
        </h1>
        <button onClick={() => client.say("increase-counter")}>increase the counter on the server</button>
    </>
}
```

## Server + Client

[wsent-server](https://www.npmjs.com/package/wsnet-server)

[wsent-client](https://www.npmjs.com/package/wsnet-client)