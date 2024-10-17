import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortArray from 'sort-array';

export async function getProjects(query) {
  let projects = await localforage.getItem("projects");
  if (!projects) projects = [];
  if (query) {
    projects = matchSorter(projects, query, { keys: ["first", "last"] });
  }
  return sortArray(projects, {by:["last", "createdAt"]})
  // return projects.sort(sortBy("last", "createdAt"));
}

export async function createProject() {
  let uri = Math.random().toString(36).substring(2, 9);
  let project = { uri,
    config:{model:"GEMINI", numOfQuestions:5, numOfUserStories:10},
    projectDetails:{
      title: "", 
      description: "",
      functionalities: [],
      roles: [],
    },
    clarificationQAs:[],
    userStories:[] };
  let projects = await getProjects();
  projects.unshift(project);
  await set(projects);
  return project;
}

export async function getProject(uri) {
  let projects = await localforage.getItem("projects");
  let project = projects.find(project => project.uri === uri);
  return project ?? null;
}

export async function updateProject(uri, updates) {
  let projects = await localforage.getItem("projects");
  let project = projects.find(project => project.uri === uri);
  if (!project) throw new Error("No project found for", uri);
  Object.assign(project, updates);
  await set(projects);
  return project;
}

export async function deleteProject(uri) {
  let projects = await localforage.getItem("projects");
  let index = projects.findIndex(project => project.uri === uri);
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