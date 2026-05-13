import type { ReactNode } from "react"

type VardPropsType={
children:ReactNode
}
export const Vard=({children}:VardPropsType)=>{
    return <div style={{backgroundColor:"red"}}>
        {children}
    </div>
}