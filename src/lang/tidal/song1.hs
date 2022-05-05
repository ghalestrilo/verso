do
  -- @setup
  setkey (-5) "major"
  setkey' 0 (-5) "major"
  setcps (90/120/2)
  all $ (# orbit 0) . (# bus' 0.4 0.4)

dr "cuba1" $ l "<~ 1>@3 0 . 0 ~ 1 <~ 1>" "[0!3 ~]*2"


let piano = p "piano" ## [s "superpiano" # velocity 0.14 # gain 2.3 # octave 4 # legato 2]
    pluck pat = p "pluck" $ pat |- up 3.1 # s "pluck" # gain 0.7 # octave 5 # cut 0
    vibe = p "vibe" ## [s "supervibe" # modamp 0 # sus 4 # velocity 0.3 # sus 4 # gain 0.7]
    bes = p "bes" ## [s "[tb:0,tb:1]" # octave 3 # gain 0.7 # lpf 350]


do
  -- @name perc
  hush
  d1 $ rs "axe" ["vk:5", "[bc:9|bo:11]*16" ] # gain 1.2 # brakk # speed 8
  d3 $ r "cuba1" ["~", "<shaker:0 shaker:6>*4"] # gain (fast 2 $ run 8 |/ 10 + 0.5)
  d2 $ tom "cuba1" [2] # s "bo" # unit "c" # speed "[8,16]"

do
  piano $ notes $ flat 6 . onkey 0 <$> voicings "bossa" ["0 <4 <-3 1>>", "[6,9,12]"]

do
  let bases = cat $ l 0 1 2 3 2 5 1 4 -- todo: 5 is major
      chords = cat $ l "[0,5,6]" "[0,4,6]" "[0,5 4,6]" "[0,2,6]" :: Pattern Int
      pluck pat = p "pluck" $ pat |+ up 2.7 # s "pluck" # gain 0.8 # octave 5 # cut 0 # pan 0.3
      piano = p "piano" ## [s "superpiano" # velocity 0.15 # gain 2 # octave 4 # legato 2 # pan 0.65]
      phrase = cat
                  [ "13@3 13 . 12 12"
                  , "14 8@2 8@5"
                  , "~ 15 14 15 14 15 16 12"
                  , "16@3 15 . 12"
                  , "~ 15 17 16 14 15 16 20"
                  , "~"
                  , "~ 12 14 13 11 12 13 18"
                  , "~@3 9"
                  ,"13@3 13 . 12 12"
                  , "14 8@2 8@5"
                  , "~ 15 14 15 14 15 16 12"
                  , "16@3 15 . 12"
                  , "~ 15 17 16 14 15 16 20" -- todo: variation
                  , "~"
                  , "~ 12 14 13 11 12 13 18"
                  , "~@3 9"
                  ] :: Pattern Int
  -- @name chords
  piano $ stack
    [ n "[~ . <0 [0 ~]!3>]*4" # t (chords |+ bases)
    , t phrase # sus 3
    ]
  pluck $ t $ "<0 -7>@3 0 . [-3*2|[-3 ~ 0 -3]|[-3 0]]" |+ bases
  p "drums" $ stack
    [ fast 2 $ s "bhh:2 bhh:2 bho bhh:2" # gain ("4 3 4 3" / 10)
    , n "0@3 0 . <0*2 [0@3 0]>" # gain 0.7 # s "bbd"
    , fast 2 $ s "bss" # gain 0.6 # brakk # speed 1.7
    ]

once $ s "bss"

piano silence
