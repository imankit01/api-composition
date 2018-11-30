console.log('before');


getUser(1)
  .then(user => getRepositories(user.gitHubUsername))
  .then(repos => getCommits(repos))
  .then(commits => console.log('Commits', commits));


console.log('after');

function getUser(id,) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from database');
      resolve({id: id, gitHubUsername: 'Ankit'});
    }, 2000);
  });

}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('calling the github api');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 4000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('calling github api');
      resolve(['commits']);
    }, 6000);
  });
}
