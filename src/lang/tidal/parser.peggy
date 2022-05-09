{
	function processScene(statements) {
    const comments = statements.filter(x => x?.comment).map(x => x.comment)
    const actions = statements.filter(x => !x?.comment)
    return {
      type: "scene",
      comments,
      actions
    }
  }
}


start = track

track = statement*

statement = blank? statement:(scene / inline_text / comment) (newline / blank)* { return statement }

blank "blank" = $" "+ { return }
newline "newline" = $[\n]+ { return }
indent "indent" = $(newline [ ]+) { return }

scene "scene" = "do" statements:(indent @(comment / inline_text))* { return processScene(statements) }

comment "comment" = "--" comment:inline_text { return { comment }}

// TEMP: until we correctly parse scenes + props, just ignore commands
inline_text = $((!newline .)+)