import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useTp from '../../hooks/useTp'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../tp/utils'
import { getFarms } from '../../tp/utils'

import Context from './context'
import { Farm } from './types'

const Farms: React.FC = ({ children }) => {
  const [unharvested, setUnharvested] = useState(0)

  const tp = useTp()
  const { account } = useWallet()

  const farms = getFarms(tp)

  return (
    <Context.Provider
      value={{
        farms,
        unharvested,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Farms
