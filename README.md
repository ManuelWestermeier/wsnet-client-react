# wsnet-client-react

## Basic Usage

```tsx
import { useClient } from "wsnet-client-react"
import Client from "wsnet-client"
import { useState } from "react"

export default function App() {
  const [counter, setCounter] = useState(0)

  //1. The client or null
  //2. the state: "loading", "sucess" or "failed"
  //3. Reacreate the client
  //4. If the conection is closed (boolean)
  const [client, state, reCreateClient, isClosed] = useClient(
    /*the argument 1 is the function to get the client (it have tu return a new client)*/
    () => {
      const client = new Client("https://wsnet-server-react-test.onrender.com", { user: "admin", password: "1234" })
      //any client "on" logic (all onSay and onGet handeler)
      client.onSay("set-counter", data => setCounter(data))

      return client
    }, /*argument 2 is wait for client to open (boolean) (default is to wait for client to open = true)*/ true,
      /*argument 3 is if you want to let the onclose handler overwrite on the client (default=true)
        if you don't want to set the the onclose handler to the client write false (the 4th output (isCLosed)) 
        don't work anymore and is set to false every time) 
      */, true
    )

  if (state == "failed" || isClosed)
    return <button onClick={() => reCreateClient()}>
      Reconect
    </button>

  if (client == null)
    return state

  return <>
    <h1>
      counter: {counter}
    </h1>
    <button onClick={() => client.say("increase-counter", undefined)}>increase the counter on the server</button>
  </>
}
```

[backend code](https://github.com/ManuelWestermeier/wsnet-server-react-test)

[preview (can load on first time over 30s)](https://manuelwestermeier.github.io/wsnet-client-react-test/docs)

## Server + Client

[wsent-server](https://www.npmjs.com/package/wsnet-server)

[wsent-client](https://www.npmjs.com/package/wsnet-client)