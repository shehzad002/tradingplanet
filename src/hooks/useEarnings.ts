import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract } from '../tp/utils'
import useTp from './useTp'
import useBlock from './useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const tp = useTp()
  const masterChefContract = getMasterChefContract(tp)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, tp])

  useEffect(() => {
    if (account && masterChefContract && tp) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, tp])

  return balance
}

export default useEarnings
