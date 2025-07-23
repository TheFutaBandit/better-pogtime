'use client'

import { ReactNode } from "react"

type Props = {
    children : ReactNode
}

import { SnackbarProvider } from 'notistack';

export const Authlayout = ({children}: Props) => {
    return (
        <div>
            <SnackbarProvider>
            {children}
            </SnackbarProvider>  
        </div>
    );
}

export default Authlayout;