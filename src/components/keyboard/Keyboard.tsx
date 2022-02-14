import { KeyValue } from '../../lib/keyboard'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'
import { useEffect } from 'react'
import { ORTHOGRAPHY } from '../../constants/orthography'
import { BackspaceIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/outline'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  guesses: string[][]
}

export const Keyboard = ({ onChar, onDelete, onEnter, guesses }: Props) => {
  const tr : any = {'ק':'ק','ר':'ר','א':'א','ט':'ט','ו':'ו','ן':'נ','ם':'מ','פ':'פ','ש':'ש','ד':'ד','ג':'ג','כ':'כ','ע':'ע','י':'י','ח':'ח','ל':'ל','ך':'כ','ף':'פ','ז':'ז','ס':'ס','ב':'ב','ה':'ה','נ':'נ','מ':'מ','צ':'צ','ת':'ת','ץ':'צ','אַ':'אַ','אָ':'אָ','װ':'װ','ױ':'ױ','ײ':'ײ','פּ':'פּ',}
  const charStatuses = getStatuses(guesses)
  const onClick = (value: KeyValue) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
      // Take away key event listener for now
      // else {
      //   const key = e.key.toUpperCase()
      //   if (key.length === 1 && key >= 'A' && key <= 'Z') {
      //     onChar(key)
      //   }
      // }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div style={{marginRight:"10px",marginLeft:"10px"}} dir="ltr">
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(0, 8).map(
          (char) => (
            <Key value={char} onClick={onClick} status={charStatuses[tr[char]]} />
          )
        )}
      </div>
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(8, 18).map((char) => (
          <Key value={char} onClick={onClick} status={charStatuses[tr[char]]} />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {ORTHOGRAPHY.slice(18, 27).map((char) => (
          <Key value={char} onClick={onClick} status={charStatuses[tr[char]]} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={60} value="ENTER" onClick={onClick}>
          <CheckCircleIcon className="h-6 w-6 cursor-pointer"/>
        </Key>
        {ORTHOGRAPHY.slice(27, ORTHOGRAPHY.length).map((char) => (
           <Key value={char} onClick={onClick} status={charStatuses[tr[char]]} />
         ))}
        <Key width={60} value="DELETE" onClick={onClick}>
          <BackspaceIcon className="h-6 w-6 cursor-pointer"/>
        </Key>
      </div>
    </div>
  )
}
