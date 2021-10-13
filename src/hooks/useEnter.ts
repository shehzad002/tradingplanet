import {useCallback} from 'react'

import useTp from './useTp'
import {useWallet} from 'use-wallet'

import {enter, getXTpStakingContract} from '../tp/utils'

const useEnter = () => {
  const {account} = useWallet()
  const tp = useTp()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(
        getXTpStakingContract(tp),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, tp],
  )

  return {onEnter: handle}
}

export default useEnter
