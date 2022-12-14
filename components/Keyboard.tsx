import styles from '../styles/Keyboard.module.scss'
import { KeyStatRecord } from '../lib/types'
import { memo, useEffect, useRef } from 'react'
import { getSpeed } from '../lib/utils'
import { schemes } from '../lib/schemes'
import { State } from '../lib/types'

type KeyStatsProps = {
  keyStats: KeyStatRecord
  keyboardScheme: State['keyboardScheme']
}

export function KeyStats({ keyStats, keyboardScheme }: KeyStatsProps) {
  const mapper = (keys: string[]) =>
    keys.map(key => {
      return (
        <KeyStat
          key={key}
          keyName={key}
          count={keyStats[key].count}
          totalTime={keyStats[key].totalTime}
        />
      )
    })

  let currentScheme = schemes.find(scheme => scheme.id === keyboardScheme) || schemes[0]
  return (
    <div className={styles.keyboard}>
      <div className={styles.row}>{mapper(currentScheme.row1)}</div>
      <div className={styles.row}>{mapper(currentScheme.row2)}</div>
      <div className={styles.row}>{mapper(currentScheme.row3)}</div>
    </div>
  )
}

type KeyStatProps = {
  count: number
  totalTime: number
  keyName: string
}

const KeyStat = memo(function KeyStat({ keyName, count, totalTime }: KeyStatProps) {
  const keySpeed = totalTime === 0 ? 0 : getSpeed(count, totalTime * 5)
  const label = getSpeedLabel(keySpeed)
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!elRef.current) return
      if (event.key === keyName) {
        elRef.current.setAttribute('data-pressed', '')
        setTimeout(() => {
          if (!elRef.current) return
          elRef.current.removeAttribute('data-pressed')
        }, 100)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [keyName])

  return (
    <div className={`${styles.key} ${label}`} ref={elRef} data-key={keyName}>
      <div className={styles.keyLabel}>{keyName}</div>
      {keySpeed !== 0 && (
        <div className={styles.keyStat}>
          <div className={styles.speed}>
            {keySpeed}
            <span className={styles.unit}>WPM</span>
          </div>
        </div>
      )}
    </div>
  )
})

export const getSpeedLabel = (speed: number) => {
  if (speed === 0) return ''
  if (speed >= 100) return styles.fast
  if (speed < 60) return styles.slow
  return styles.normal
}