import { memo } from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const Auth = () => {
    let isLogin = useSelector(state => state.auth.token)
    return isLogin ? <Outlet /> : <Navigate to={"/"} replace />
}

export default memo(Auth)