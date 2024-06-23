# wsnet-client-react

## Basic Usage

```jsx
import { useClient } from "wsnet-client-react"

function App() {
    //1. The client or null
    //2. the state: "loading", "sucess" or "failed"
    const [client, state] = useClient(
        //client ws-url
        "ws://localhost:8080/",
        //params
        { password: "xy" }
    )

    //any client logic
    client.onSay("test", data => console.log(data))
    
    return <h1>
        {state}
    </h1>
}
```