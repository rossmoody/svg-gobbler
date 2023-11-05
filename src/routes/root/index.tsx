import { Outlet } from 'react-router-dom'

/**
 * This is a lonely route that is used to initialize the app via chrome messages between client and background scripts.
 * It is immediately forwarded to /dashboard to stop the subsequent attempts at message passing which
 * always fail because there is no listener.
 */
export const RootRoute = () => <Outlet />
