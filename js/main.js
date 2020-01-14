//SearchBar value reader
$(document).ready(function(){
   $('#searchUser').on('keyup', function(e){
       let username = e.target.value; 

       //make request to github
       $.ajax({
           url:'https://api.github.com/users/' + username,
           data: {
               client_id:'a2eecdd1669d60f2f14d',
               client_secret: '51397f2417f2ac60d4c9f8db7abce1630cdbdd89'
           }
       }).done(function(user){
            $.ajax({
                url:'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id:'a2eecdd1669d60f2f14d',
                    client_secret: '51397f2417f2ac60d4c9f8db7abce1630cdbdd89',
                    sort: 'created: asc',
                    per_page: 5
                    
                }
            //gathers information from the repo object and places it in html elements before appending it to the web app    
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="jumbotron">
                            <div class="row mt-1">
                                <div class="col-md-6 mt-1">
                                    <strong>${repo.description}</strong>
                                </div>
                                <div class="col-md-4 mt-1">
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Forks: ${repo.forks_count}</span>
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Watchers: ${repo.watchers_count}</span> 
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Stars: ${repo.stargazers_count}</span> 
                                </div>
                                <div class="col-md-2 mt-1">
                                    <a href="${repo.html_url}" target="_blank" class="btn btn-success">View Repo</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
           //gathers information from the username object and places it in html elements before appending it to the web app     
           $('#profile').html(`
                <div class="jumbotron">
                    <div class="card text-center">
                        <h3 class="card-header">${user.name}</h3>
                    </div>
                    <div>
                        <div class="row">
                            <div class="col-md-3">
                                <img src="${user.avatar_url}"  class="thumbnail avatar mt-2" alt="GitHub Avatar" />
                                <br>
                                <a target="_blank" class="btn btn-primary btn-block mt-2" href="${user.html_url}">View Profile</a>
                            </div>
                            <div class="col-md-9 mt-2">
                                <div class="mx-auto">
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Public Repos: ${user.public_repos}</span>
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Public Gists: ${user.public_gists}</span> 
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Followers: ${user.followers}</span> 
                                    <span class="d-inline-flex bg-danger p-1 text-white"> Following: ${user.following}</span>
                                </div>
                                <ul class="list-group mt-2">
                                    <li class="list-group-item"> Company: ${user.company}</li>
                                    <li class="list-group-item"> Location: ${user.location}</li>
                                    <li class="list-group-item"> Bio: ${user.bio}</li>
                                    <li class="list-group-item"> Email: ${user.email}</li>                                    
                                </ul>                                
                            </div>
                        </div>
                    </div>    
                </div>
           `); 
       });
   });
});