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
