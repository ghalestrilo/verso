#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
use commands::{list_projects, AppState};

fn main() {
    // let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    // let close = CustomMenuItem::new("close".to_string(), "Close");
    // let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));

    tauri::Builder::default()
        .manage(AppState {
            children: Default::default(),
        })
        .invoke_handler(tauri::generate_handler![list_projects])
        // .add_item(CustomMenuItem::new("hide", "Hide"))
        // .add_submenu(submenu);
        // .run(tauri::generate_context!("./tauri.conf.json"))
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
