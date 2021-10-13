import {useCallback} from 'react'

import useTp from './useTp'
import {useWallet} from 'use-wallet'

import {leave, getXTpStakingContract} from '../tp/utils'

const useLeave = () => {
  const {account} = useWallet()
  const tp = useTp()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(
        getXTpStakingContract(tp),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, tp],
  )

  return {onLeave: handle}
}

export default useLeave
