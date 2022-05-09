import { parse } from './parser'
import fs from 'fs';


const content = fs.readFileSync('src/lang/tidal/song1.hs', 'utf8')

describe('tidal language support', () => {
  it('parses file correctly', () => {
    parse(content)
  })
  
  it('parses correct scene count', () => {
    const parsed = parse(content, {trace: true})
    console.log(JSON.stringify(parsed))
    expect(parsed.filter(stm => stm?.type === 'scene')).toHaveLength(4)
  })
})