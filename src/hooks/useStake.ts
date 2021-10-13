import { useCallback } from 'react'

import useTp from './useTp'
import { useWallet } from 'use-wallet'

import { stake, getMasterChefContract } from '../tp/utils'

const useStake = (pid: number) => {
  const { account } = useWallet()
  const tp = useTp()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(tp),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, tp],
  )

  return { onStake: handleStake }
}

export default useStake
