import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const getLocalData = async function () {
  // const localData = localStorage.getItem("myData");
  // const result = JSON.parse(localData);
  // return result;

  return new Promise(function (resolve, reject) {
    const localData = localStorage.getItem("myData");
    const result = JSON.parse(localData);
    resolve(result);
  });
};

// **************** THIS CODE IS FOR API FETCH ***********************//

export const getJSON = async function (url) {
  try {
    // const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// **************** THIS CODE IS FOR FAKE FETCH FROM LOCAL STORAGE***********************//

// export const getJSON = async function () {
//   try {
//     const data = getLocalData();
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
