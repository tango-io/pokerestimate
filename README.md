#PokerEstimate

Estimates stories from PIVOTALTRACKER by playing planning poker. The purpose of this application is to facility to the project manager to do sprint plans. You can group stories into games, so with that it's easy to manage iterations.

In middle of a iteration you can see notifications when a participant has voted. and when time is over all the cards are showed and the point for that story is calculated.

##Things you need

- Computer (with internet)
- node.js
- npm
- ExpressJS

###Install node

     git clone https://github.com/joyent/node.git
     cd node
     ./configure
     make
     make install

###Install npm

npm comes with node now but if not

    brew install npm

###Checking node version

NOTE: If you're using 'nvm' please use the 0.8.14 node version

    nvm use 0.8.14

If you haven't installed that version install with :

    nvm install 0.8.14

###Install express

    npm install express -g

###Install dependencies

    npm install -d

###Run the application

    node app.js

##API

GET /api/v1/projects

    [{
       _id: 0,
       id: 0,
       name: "name"
    }]

GET /api/v1/projects?id=id

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

GET /api/v1/projects/:id/tasks/:id

    {
      _id: 0,
      id: 0,
      project_id: 0,
      title: "",
      url: "",
      description: "",
      requested_by: "",
      owned_by: "",
      labels: ""
    }

##styling

Install zurb-foundation gem:

    gem install zurb-foundation -v 3.2.5

Install animation and animate gems:

    gem install animation --pre

    gem install animate --pre

Compile Scss file;
  
    compass watch <path>

