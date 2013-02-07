var database = require("../config/database");
var program  = require('commander');

program
  .version('0.0.1');

program
  .command('clear [collection]')
  .description('Clear a specified collection')
  .action(function(collection){

    database.close();
    database.open(function(er, db){
      if(er){console.log(er); process.exit();}

      if(db[collection]){
        console.log('Deleting users...');
        db[collection].remove(function(){
          console.log('Done!');
          process.exit();
        });
      }else{
        console.log('Collection does not exist!');
        process.exit();
      }
    });

  });


program.parse(process.argv);
