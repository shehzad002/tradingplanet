import {useCallback} from 'react'

import useTp from './useTp'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getTpContract,
  getXTpStakingContract
} from '../tp/utils'

const useApproveStaking = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const tp = useTp()
  const lpContract = getTpContract(tp)
  const contract = getXTpStakingContract(tp)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveStaking
