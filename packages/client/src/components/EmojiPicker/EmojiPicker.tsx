import { Button, Popup } from '@gravity-ui/uikit'
import { useState, useRef } from 'react'
import styles from './EmojiPicker.module.scss'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  disabled?: boolean
}

const availableEmojis = [
  '😀',
  '😂',
  '😍',
  '🤔',
  '👍',
  '👎',
  '❤️',
  '🔥',
  '💯',
  '🎉',
  '😢',
  '😡',
  '🤯',
  '👏',
  '🙌',
  '💪',
  '🎯',
  '🚀',
  '⭐',
  '💡',
]

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  onEmojiSelect,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji)
    setIsOpen(false)
  }

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleButtonClick}
        disabled={disabled}
        size="s"
        view="outlined"
        className={styles.emojiButton}>
        +
      </Button>

      <Popup
        anchorRef={buttonRef}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        placement="top-start"
        className={styles.popup}>
        <div className={styles.emojiGrid}>
          {availableEmojis.map((emoji, index) => (
            <button
              key={index}
              className={styles.emojiItem}
              onClick={() => handleEmojiClick(emoji)}
              type="button">
              {emoji}
            </button>
          ))}
        </div>
      </Popup>
    </>
  )
}
