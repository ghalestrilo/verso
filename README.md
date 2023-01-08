# Verso

Verso is a grid-based livecoding workstation for music production and performance. It is language-agnostic and will support any live-coding language provided a compatible plugin. Currently, only [tidalcycles](https://tidalcycles.org/) is available and in very early development.

## MVP Roadmap

The feature roadmap for Verso can be found [here]()

- [x] Basic tidal parsing
- [x] Scene/command grid
- [x] Parse channel names
- [ ] Sending commands to the language REPL
- [x] Save / Load files
- [x] Implement a proper code editor using [CodeMirror 6](https://codemirror.net/6/) (or another library)
- [ ] Create a working native build
- [ ] Repl tabs
- [x] Stop button
- [ ] Keyboard Navigation + commands
- [x] Shortcuts
- [ ] Shortcut helper / mode navigator
- [ ] Buttons for playing scenes and channel commands
- [ ] Scene editor prototype (Button + Modal + Form)
  - Edit scene
  - Edit channel command

Stretch goals

- [ ] Read a config file
- [ ] Custom channels / track post-parsing filter

## Running

Native binary releases will be made available on this page at some point. To run the project for development, you will need to install `cargo` and `yarn`.

After cloning the repository, install dependencies from the root folder with `yarn install` and run the project with `yarn tauri dev`.

## Contributing

This project is currently being run by a sole maintainer without backing or any real team behind it. There are a number of ways to help if you're interested, ranging from coding work to no code knowledge at all. All of them are hugely appreciated:

- **Writing language plugins**: Verso will only ever be as good as the support it provides for creative coding languages. The [list of languages]() is endless and coding parsers for all of them is daunting for a single person, but together we can move much quicker and build something to be used by a wide community of people in the creative space. You can help by creating or improving an existing `Plugin` (on the `/lang/` folder), which should have these parts:

  - Parser: The _language parser_ is the heart of a plugin. They're built with [`peggy`](), a very simple language for creating small parsers with javascript. The point is not to parse a language with extreme precision, but rather to make sure we can retrieve intelligible musical data from that text. The `TrackState` and `TrackScene` types should describe concisely what kind of data a verso parser must return.
  - Verso `@commands`: verso will treat some special comments differently, allowing the user code to control a few aspects of the editor.
    - `@name <My Scene Name>`: This tag will label your row/scene to your scene name (`<My Scene Name>` in this example)
    - `@colors <instrument1>:<color> <instrument2>:<color> ...`: this will cause the row to color each `<instrument>` cell with the procided `<color>`. The `@colors drums:blue`, for instance, will cause the `drums` column to be `blue` on that specific row. Color names refer to [`chackra ui` color classes]().
  - Ad-hoc commands: such as starting/stopping general playback.

- **Test-driving**: Download a verso binary / run the repo in dev mode and have a go!
- **Discussion**: any feedback or feature request about verso is welcome. If you're a live-coding/algorave musician or enthusiast and verso does not suit your needs, I'd like to understand why. Leave your thoughts on:

  - The [verso thread]() for general discussion
  - The [feature roadmap]() for feedback on specific features
  - Bug reporting: if you encounter a bug while testing verso, please raise an **issue**. It will be helpful if you can attach an example track _code_ which triggers the issue and information on the _system_ being used.

- **Native Build support**: I'm currently limited to a Mac machine. I'll appreciate if people from different platforms can help configure build outputs for those and ensure they run without issues.
- **Feature work**: If you can code at all and want to take a swing at a feature on the [roadmap](), please go ahead! If you need help, PM me on the [tidalcycles forum]() or raise an issue. I'll be happy to review contributions myself for the time being
- **Reviewing Code**: Another way to help is to review merge requests. This will improve code quality and make incoming code easier to trust and merge.
- **Fixing bugs**: you're encouraged to attempt fixing any open **issues** for verso bugs. I kindly ask you to add tests on doing so
- **Writing tests**: verso is being prototyped to allow moving quickly as its feature set is defined. Because of this, it lacks tests for most of its functionality. Automated tests can be written with `jest` and `testing framework`. If you have expertise and want to help, this is also a great way to do so.
- **Design work**: the current appearance of verso is just inherited from the choice of framework. Little to no effort went into making it look pretty so far. If you can't code but have some design expertise and know how to work with `figma` or another similar tool, please bring your ideas to the table. This is an opportunity to help shape what an the future of an open-source tool should look like
