import { useSelector } from 'react-redux'

export const useChatId = (): string => {
  const chatId = useSelector((s:{chatId: string}) => s.chatId)
  return chatId
}
