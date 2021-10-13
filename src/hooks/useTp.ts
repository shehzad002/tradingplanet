import { useContext } from 'react'
import { Context } from '../contexts/TpProvider'

const useTp = () => {
  const { tp } = useContext(Context)
  return tp
}

export default useTp
