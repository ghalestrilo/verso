import { useHotkeys } from 'react-hotkeys-hook';
import { useControlState } from '../state/control';
import { TrackStateType } from '../state/track';

const useSessionControls = (track: TrackStateType) => {
  const control = useControlState();
  useHotkeys('a', () => alert('a'))
  useHotkeys('down', () => control.moveSelection('down'))
  useHotkeys('up', () => control.moveSelection('up'))
  useHotkeys('left', () => control.moveSelection('left'))
  useHotkeys('right', () => control.moveSelection('right'))
}

export default useSessionControls;