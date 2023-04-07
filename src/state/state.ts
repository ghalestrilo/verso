import create from 'zustand'
import { useReplState } from './repl'
import { useSettingsState } from './settings'
import { useTrackState } from './track'

export const useState = create(() => {
  const repl = useReplState()
  const settings = useSettingsState()
  const track = useTrackState()

  return {
    ...useReplState(),
    ...useSettingsState(),
    ...useTrackState()
  }
})