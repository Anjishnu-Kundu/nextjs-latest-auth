// export default function DashboardPage() {
//     return(
//         <div>
//             <h1>Super Secret Dashboard</h1>
//         </div>
//     )
// }

import { cookies } from "next/headers";
import { COOKIE_NAME } from "../../../constants";
import { verify } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export default function DashboardPage() {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value

    if (!token) {
        return <p>Unauthorized</p>
    }

    const secret = process.env.JWT_SECRET || "";
    let decodedToken: any;

    try {
        verify(token, secret)
        decodedToken = jwtDecode(token)
    } catch (error) {
        return <p>Something went wrong</p>
    }

    return (
        <div>
            <h1>Super Secret Dashboard</h1>
            <p>User Info:</p>
            <pre>{JSON.stringify(decodedToken, null, 2)}</pre>
        </div>
    )
}
