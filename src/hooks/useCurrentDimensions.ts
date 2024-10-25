import { useEffect, useState } from 'react'
import { MOBILE_MAX_WIDTH } from '../contants'

const useCurrentDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    function updateResize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', updateResize)

    return () => {
      window.removeEventListener('resize', updateResize)
    }
  }, [dimensions])
  return {
    dimensions,
  }
}

export default useCurrentDimensions

export const useIsMobile = (): boolean => {
  const { dimensions } = useCurrentDimensions()
  return dimensions.width <= MOBILE_MAX_WIDTH
}
