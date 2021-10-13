import { useCallback } from 'react'

import useTp from './useTp'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract } from '../tp/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const tp = useTp()
  const masterChefContract = getMasterChefContract(tp)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, tp],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
