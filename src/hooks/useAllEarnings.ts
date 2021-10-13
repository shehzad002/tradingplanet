import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getMasterChefContract, getFarms } from '../tp/utils'
import useTp from './useTp'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const tp = useTp()
  const farms = getFarms(tp)
  const masterChefContract = getMasterChefContract(tp)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, tp])

  useEffect(() => {
    if (account && masterChefContract && tp) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setBalance, tp])

  return balances
}

export default useAllEarnings
