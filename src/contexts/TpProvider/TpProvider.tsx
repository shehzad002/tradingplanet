import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Tp } from '../../tp'

export interface TpContext {
  tp?: typeof Tp
}

export const Context = createContext<TpContext>({
  tp: undefined,
})

declare global {
  interface Window {
    tpsauce: any
  }
}

const TpProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()
  const [tp, setTp] = useState<any>()

  // @ts-ignore
  window.tp = tp
  // @ts-ignore


  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const tpLib = new Tp(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setTp(tpLib)
      window.tpsauce = tpLib
    }
  }, [ethereum])

  return <Context.Provider value={{ tp }}>{children}</Context.Provider>
}

export default TpProvider
