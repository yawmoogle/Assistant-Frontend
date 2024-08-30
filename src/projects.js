import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getProjects(query) {
  let projects = await localforage.getItem("projects");
  if (!projects) projects = [];
  if (query) {
    projects = matchSorter(projects, query, { keys: ["first", "last"] });
  }
  return projects.sort(sortBy("last", "createdAt"));
}

export async function createProject() {
  let id = Math.random().toString(36).substring(2, 9);
  let project = { id,
    config:{AIModel:"GEMINI", numOfQuestions:"5", numOfUserStories:"10"},
    projectDetails:{
      title: "Enter your project title", 
      description: "A short description of your project",
      functionalities: [],
      rolePills: [],
    },
    clarificationQAs:[],
    userStories:[],
   };
  let projects = await getProjects();
  projects.unshift(project);
  await set(projects);
  return project;
}

export async function getProject(id) {
  let projects = await localforage.getItem("projects");
  let project = projects.find(project => project.id === id);
  return project ?? null;
}

export async function updateProject(id, updates) {
  let projects = await localforage.getItem("projects");
  let project = projects.find(project => project.id === id);
  if (!project) throw new Error("No contact found for", id);
  Object.assign(project, updates);
  await set(projects);
  return project;
}

export async function deleteProject(id) {
  let projects = await localforage.getItem("projects");
  let index = projects.findIndex(project => project.id === id);
  if (index > -1) {
    projects.splice(index, 1);
    await set(projects);
    return true;
  }
  return false;
}

function set(projects) {
  return localforage.setItem("projects", projects);
}

// fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise(res => {
//     setTimeout(res, Math.random() * 800);
//   });
// }