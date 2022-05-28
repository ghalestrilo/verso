// Developed with https://peggyjs.org/online
{
	function processScene(statements) {
    const comments = statements.filter(x => x?.comment).map(x => x.comment)
    const actions = statements.filter(x => !(x?.comment || x?.meta))
    const meta = statements.filter(x => x?.meta).map(x => x.meta)
    return {
      type: "scene",
      comments,
      actions,
      meta
    }
  }

  // TODO: create structureTrack function
  function structureTrack(statements = []) {
    const scenes = statements.filter(s => s.type === 'scene')

    const channels = scenes.filter(s => s.type === 'scene')
      .map(({ actions }) => actions.map(({ channel }) => channel))
      .flat()
      .filter(x => x)

    return {
      // scenes: statements.filter(x => x?.type === 'scene')
      // TODO: actions should be { channel, command, raw } so it's easier to send to repl
      scenes: scenes.map(scene => ({
        ...scene,
        actions: Object.fromEntries(
          scene.actions.map(action => action.channel
            ? [action.channel, action.command]
            : ['unknown', action])
          )
      })),
      channels,
      }
  }
}


// TODO: call structureTrack function
start = track

track = statements:(statement*) { return structureTrack(statements)}


statement = blank? statement:(scene / stray_command / comment) (newline / blank)* { return {
  ...statement,
  raw: text()
} }



// Seg Concepts
scene "scene" = "do" statements:(indent @(command / comment / inline_text))* { return processScene(statements) }

command "channel command"
    = channel:channel command:inline_text { return {
      channel,
      command
    }}
    // = channel parameter* <param-sep space> pattern effect* 

channel = pchannel / dchannel
pchannel = "p " name:string { return name }
dchannel = name:([d] integer) { return name.join('') }

// Basic parsing units
blank "blank" = $" "+ { return }
newline "newline" = $[\n]+ { return }
indent "indent" = $(newline [ ]+) { return }
string "string" = quotes @$(!newline !quotes .)* quotes
quotes = "\""
integer "integer" = digits:[0-9]+ { return parseInt(digits.join(""), 10); }


comment "comment" = "--" text:(scene_meta / inline_text) {
  return text.meta ? text : { comment: text }
}

scene_meta "scene metadata" =
  blank? "@" key:([a-z]+) value:inline_text { return { meta: { [key.join('')]: value } } }

stray_command = inline_text { return { type: "stray", text: text() }}

// TEMP: until we correctly parse scenes + props, just ignore commands
inline_text = $((!newline .)+)