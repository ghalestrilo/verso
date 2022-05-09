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
}


start = track

track = statement*

statement = blank? statement:(scene / stray_command / comment) (newline / blank)* { return statement }

blank "blank" = $" "+ { return }
newline "newline" = $[\n]+ { return }
indent "indent" = $(newline [ ]+) { return }

scene "scene" = "do" statements:(indent @(comment / inline_text))* { return processScene(statements) }

comment "comment" = "--" text:(scene_meta / inline_text) {
  return text.meta ? text : { comment: text }
}

scene_meta "scene metadata" = blank? "@" meta:inline_text { return { meta } }

stray_command = inline_text { return { type: "stray", text: text() }}

// TEMP: until we correctly parse scenes + props, just ignore commands
inline_text = $((!newline .)+)