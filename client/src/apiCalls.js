//all of the API calls to the backend in one file

const PORT_URL = "http://localhost:3000";

export async function addData(formData) {
  await fetch(`${PORT_URL}/data/add`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(formData),
  });
}

export async function putTags(randomData, tagData) {
  await fetch(`${PORT_URL}/tag/update`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ _id: randomData._id, newTags: tagData }),
  });
}

export async function putRecentTag(chosenTagFilter) {
  await fetch(`${PORT_URL}/tag/recent`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ tag: chosenTagFilter }),
  });
}

export async function createFiles() {
  await fetch(`${PORT_URL}/excel/create`, {
    method: "Get",
  });
}

export async function fetchRandomData(chosenTagFilter) {
  return await fetch(`${PORT_URL}/data/random?tag=${chosenTagFilter}`, {
    method: "GET",
  });
}

export async function fetchRecentTag() {
  return await fetch(`${PORT_URL}/tag/recent`, {
    method: "GET",
  });
}

export async function fetchAllTags() {
  return await fetch(`${PORT_URL}/tag`, {
    method: "GET",
  });
}
