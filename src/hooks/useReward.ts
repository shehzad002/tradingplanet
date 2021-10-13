import { useCallback } from 'react'

import useTp from './useTp'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../tp/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const tp = useTp()
  const masterChefContract = getMasterChefContract(tp)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, tp])

  return { onReward: handleReward }
}

export default useReward
