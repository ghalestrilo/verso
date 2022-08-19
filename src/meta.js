export const repos = {
  self: 'https://github.com/ghalestrilo/seg-react',
  tidal: 'https://tidalcycles.org/',
}


export const examples = {
  codeSample: {
    tidal: `do
    -- @name
    d1 $ slow 2 $ s "bd(3,8) . ~ bd ~ ~"
    d2 "~ sn:2"`
  },
  fileData: {
    tidal: `-- Triangles
    do
      -- @name triangles
      setcps 2
      d1
        $ (n . fastcat)
          [ randcat ["13", "13", "2"]
          , "10"
          , randcat ["13", "5", "11", "2", "6"]
          ]
        # pan (range (-1) 1 $ rand)
        # s "gretsch"
        # bus
        # lpf 8000
        # fader 1
      d2 $ (note . root . scale "minor") "<2 4 6>@2 <0 2 3>"
        # s "supervibe"
      d3 $ (note . root . scale "minor") ("{0@5 1@4 0@8 1}%3" |- 4 |+ "[-3,0,2,6]")
        # s "superpiano"
      d4 $ (note . root . scale "minor") "{4 5 7 11@4 10@5 9 7 5 8 6 4@4}%3"
          # s "superpiano"
          # sus 2
          # lpf 800
    
    do
      -- @name add a third lol
      d4 $ (note . root . scale "minor") ("{4 5 7 11@4 10@5 9 7 5 8 6 4@4}%3" |+ "[0,2]")
          # s "superpiano"
          # sus 2
          # lpf 800`
  }
}