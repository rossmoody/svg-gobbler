import { Outlet } from 'react-router-dom'

/**
 * This is a lonely route that is used to initialize the app via messages between client and background scripts.
 * It is immediately forwarded to /dashboard to stop the subsequent attempts at message passing.
 */
export const RootRoute = () => <Outlet />
