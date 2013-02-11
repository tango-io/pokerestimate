#PokerEstimate

Estimates stories from PIVOTALTRACKER by playing planning poker. The purpose of this application is to facility to the project manager to do sprint plans. You can group stories into games, so with that it's easy to manage iterations.

In middle of a iteration you can see notifications when a participant has voted. and when time is over all the cards are showed and the point for that story is calculated.

##API

GET /api/v1/projects

    [{
       _id: 0,
       id: 0,
       name: "name"
    }]

GET /api/v1/projects/:id

    {
      _id: 0,
      id: 0,
      name: "name"
    }

GET /api/v1/projects/:id/tasks

    [{
      _id: 0,
      id: 0,
      project_id: 0,
      title: "",
      url: "",
      description: "",
      requested_by: "",
      owned_by: "",
      labels: ""
    }]

##styling

Install zurb-foundation gem:

    gem install zurb-foundation

Compile Scss file;
  
    compass watch <path>

