import { useEffect } from "react"

type useEscapeKeyProps = {
  onClose: () => void
}

const useEscapeKey = ({ onClose }: useEscapeKeyProps) => {
  const KEY_NAME_ESC = "Escape"
  const KEY_EVENT_TYPE = "keyup"

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === KEY_NAME_ESC) {
        onClose()
      }
    }

    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false)

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false)
    }
  }, [onClose])
}

export default useEscapeKey
