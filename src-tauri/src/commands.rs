extern crate shell_words;
use std::{collections::HashMap, process::Child, sync::Mutex};
use tauri::State;
use walkdir::{DirEntry, WalkDir};

pub struct AppState {
    pub children: Mutex<HashMap<String, Child>>,
}

fn is_verso_project(entry: &DirEntry) -> bool {
    !entry
        .file_name()
        .to_str()
        .map(|name| name.starts_with("."))
        .unwrap_or(false)
}

#[tauri::command]
pub fn list_projects(name: &str, _: State<AppState>) -> Result<Vec<String>, String> {
    let walk_result: Result<Vec<DirEntry>, walkdir::Error> = WalkDir::new(name)
        .into_iter()
        .filter_entry(is_verso_project)
        .collect();

    match walk_result {
        Ok(result) => {
            let final_result: Vec<String> = result
                .into_iter()
                .map(|e| e.path().to_str().unwrap_or("default").to_string())
                .filter(|e| e.ends_with(".tidal"))
                .collect();
            Ok(final_result)
        }
        Err(err) => Err(err.to_string()),
    }
}

// pub fn spawn_child(command: String, storage: &State<AppState>) -> Result<Vec<String>, String> {
//     if command.len() < 1 {
//         return Err("No command provided".to_string());
//     }

//     let args = shell_words::split(&command).expect("failed to parse command");
//     let name = args[0].to_owned();

//     let child: Child = Command::new(name.to_string())
//         .args(&args[1..])
//         .spawn()
//         .expect("failed to start subprocess");

//     storage
//         .children
//         .lock()
//         .unwrap()
//         .insert(name.to_string(), child);

//     Ok(args)
// }

// // https://tauri.app/v1/api/js/shell/
// #[tauri::command]
// pub fn start_children(
//     processes: Vec<String>,
//     storage: State<AppState>,
// ) -> Result<Vec<Vec<String>>, String> {
//     let spawned = processes.into_iter().map(|x| spawn_child(x, &storage));
//     let otherspawned = spawned.clone();
//     match otherspawned
//         .filter(|x| x.is_err())
//         .map(|x| x.unwrap_err())
//         .collect::<Vec<String>>()[..]
//     {
//         [] => Ok(spawned.map(|x| x.unwrap()).collect::<Vec<Vec<String>>>()),
//         // [] => Ok(),
//         _ => Err("error spawning child processes".to_string()),
//     }
// }
