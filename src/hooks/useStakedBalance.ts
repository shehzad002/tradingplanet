import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked, getMasterChefContract } from '../tp/utils'
import useTp from './useTp'
import useBlock from './useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const tp = useTp()
  const masterChefContract = getMasterChefContract(tp)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, tp])

  useEffect(() => {
    if (account && tp) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, tp])

  return balance
}

export default useStakedBalance
