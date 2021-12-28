import { useEffect } from "react"

export const Title = ({ children }) => {
    useEffect(() => {
        document.title = children
    }, [children])

    return null
}