import React from "react"
import "@fontsource/oswald/400.css" 
import "@fontsource/oswald/700.css" 
import "./src/styles/globalStyles.css"
import Layout from "./src/components/Layout"
import { CartProvider } from "./src/context/cartContext"

export function wrapPageElement({element, props}) {
    return <Layout {...props}>{element}</Layout>
}

export function wrapRootElement({element}) {
    return <CartProvider>{element}</CartProvider>
}