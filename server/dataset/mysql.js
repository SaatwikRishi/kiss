const mysql = require('mysql2');
const perf = require('execution-time')();
class mysqldb{

    constructor(connection, pool){        
        this.pool = pool
        this.connection = connection      
        this.error={}
    }
    async execute(query,array){
        let {config}=this
        //const calLogger = cal.createTransaction('Mysql', 'statement');
      try{
            //let conn = await this.pool.getConnection()     
            let conn =  this.pool   
           // console.log({query,array})
            let [result, rows]= await conn.execute(query,array)
            //console.log(result)
            //conn.release()
            //conn.end()
            //cal.createEvent('Mysql',"statement",'0',query).complete()
            //calLogger.addData(query)
            //calLogger.status = //cal.Status.SUCCESS;
            return result   
        }
        catch(ex){
            //cal.createEvent('Mysql',"statement",'1',ex.toString()).complete()
            //calLogger.addData({ex})
            //calLogger.status = //cal.Status.FATAL;
            this.error=ex
            console.error({executeError:this.error})
            return {executeError:this.error}
      }

      
    } 

    async query (query, name=null){
      try{         
     
            let db = await this.pool.getConnection()
            //let db = await pool.getConnection()
            //console.log( "-------------------------------------------------------------------------------------------------")
            //console.log( query)
            //console.log( "-------------------------------------------------------------------------------------------------")
            perf.start("execution")    
            let [result, rows]= await db.query(query)
            //console.log({result, rows})
            let perfexecution = perf.stop("execution")
            console.log(`${name} :: took ${perfexecution.words}`)
            db.release()     
            //connection.releaseConnection()
            return result   
        }
        catch(ex){                     
            console.error({ex})
            return {error:ex.toString()}
        }
    }


}
module.exports=mysqldb