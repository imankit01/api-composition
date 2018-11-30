console.log('Before');
//getUser(1, (user) => {
  //getRepositories(user.gitHubUsername, (repos) => {
    //getCommits(repos[0], (commits) => {
    //  console.log(commits);
  //  })
//  })
//});

// Async and Await approach
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos);
    console.log(commits);
  }
  catch(err) {
    console.log('error message');
  }
}

displayCommits();

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from a database...');
      resolve({ id: id, gitHubUsername: 'Ankit' });
    }, 2000);
  });
}


function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
      //reject(new error('couldnot get the repos'));
    }, 2000);
  });
}


function getCommits(repo) {
  return new Promises((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['commit']);
      //reject(new error('couldnot get the commits'));
    }, 2000);
  });
}
