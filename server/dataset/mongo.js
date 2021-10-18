const { MongoClient } = require("mongodb");
const perf = require('execution-time')(console.log);
class mysqldb{

    constructor(client,db='twitter'){        
        this.client = client  
        this.db=db     
    }

    async find (query,collections='users',limit=100){
      try{         
          let {client,db}=this     
            await client.connect();
            const database = client.db(db);
            //let db = await pool.getConnection()
            const collection = database.collection(collections);
            console.log( "-------------------------------------------------------------------------------------------------")
            console.log("Executing :",collections)
            console.log( query)
            console.log( "-------------------------------------------------------------------------------------------------")
            perf.start("execution")    
            let  result = await   collection.find(query).sort({_id:-1}).limit(limit).toArray()
            let perfexecution = perf.stop("execution")
            await client.close();
            //connection.releaseConnection()
            //result=[...result,perfexecution.verboseWords]
            return result   
        }
        catch(ex){                     
            console.error({ex})
            return {error:ex}
        }
    }
    async updateOne(query,update,collections='users'){
      try{         
          let {client,db}=this     
            await client.connect();
            const database = client.db(db);       
            const collection = database.collection(collections);
            const options = { "upsert": true };
            console.log( "-------------------------------------------------------------------------------------------------")
            console.log("Executing :",collections)
            console.log( query)
            console.log( "-------------------------------------------------------------------------------------------------")
            perf.start("execution")    
            let  result = await   collection.updateOne(query, update, options)
            let perfexecution = perf.stop("execution")
            await client.close();
            //connection.releaseConnection()
            //result=[...result,perfexecution.verboseWords]
            return result   
        }
        catch(ex){                     
            console.error({ex})
            return {error:ex.toString()}
        }
    }
    async insertMany(query,collections='users'){
      try{         
          let {client,db}=this     
            await client.connect();
            const database = client.db(db);       
            const collection = database.collection(collections);
            const options = { "upsert": true };
            console.log( "-------------------------------------------------------------------------------------------------")
            console.log("Executing :",collections)

            console.log( "-------------------------------------------------------------------------------------------------")
            perf.start("execution")    
            let  result = await   collection.insertMany(query)
            let perfexecution = perf.stop("execution")
            await client.close();
            //connection.releaseConnection()
            //result=[...result,perfexecution.verboseWords]
            return result   
        }
        catch(ex){                     
            console.error({ex})
            return {error:ex}
        }
    }


}
module.exports=mysqldb


 /*  let result=await req.client.find({                
                epoch: {
                    $gte: moment().subtract(5,'minutes').unix(),
                    $lte: moment().unix()
                }                
            },'stream') */     