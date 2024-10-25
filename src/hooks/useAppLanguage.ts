import { useSelector } from 'react-redux'
import { Language } from '../types/generalTypes'

const useAppLanguage = (): Language => {
  const language: Language = useSelector((s: any) => s.language)
  return language
}

export default useAppLanguage
