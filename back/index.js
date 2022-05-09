var express = require('express');
var http = require('http');
var logger = require('morgan');
var path = require('path');
var jwt = require('jsonwebtoken');
var app = express();
var cors = require('cors');
const { Pool, Client } = require('pg');
const bodyParser = require('body-parser');
const bbb = require('bigbluebutton-js')
let bbb_api = bbb.api(
    'https://manager.bigbluemeeting.com/bigbluebutton/', 
    'zhUut5K87KyWg2ptSKQKj3roO7sJUQ2Ab1I0N8Mikx'
  )
let http1 = bbb.http  

const db_cred = {
    user: 'postgres',
    host: 'localhost',
    database: 'NPTD',
    password: 'aleksandar1234',
    port: 5432,
};
app.use(bodyParser.json());
app.use(logger("short"));
app.use(cors());
var publicPath =  path.resolve(__dirname,"front");
app.use(express.static(publicPath));

app.post('/login', async(req,res)=>{
    //console.log(req.body);
    let ret = {token:null,msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        let pool = new Pool(db_cred); 
        const { rows } = await pool.query('SELECT * FROM PROFILI WHERE EMAIL = $1 AND PASS = $2;',[req.body.email,req.body.password]);
        pool.end();
        if (rows.length == 0){
            ret.msg = 'Pogresno unijeti podaci';
            res.statusCode = 200;
            res.json(ret);
            return;
        }
        tok = jwt.sign( {email : req.body.email,ime:rows[0].ime},'aaaaaaaaaa',{expiresIn : '4h'});
        ret.token = tok;
        ret.msg ='GG';
        res.statusCode = 200;
        res.json(ret); 
        
    }
    catch(err){
       // console.log(err);
        ret.msg ='Xd';
        res.statusCode = 200;
        res.json(ret); 
    }
});

app.post('/register/',async (req,res)=>{

    // console.log(req.body);
     let ret = {msg:''};
     if (!req.body){
         ret.msg = 'Neuspjesno';
         res.sendStatus = 200;
         res.json(ret);
         return;
     }
     try{
         const pool = new Pool(db_cred);
         const {rows} = await pool.query('SELECT * FROM PROFILI WHERE EMAIL = $1;',[req.body.email]);
         //console.log(rows);
         if (rows.length == 1){
             ret.msg = 'email';
             res.sendStatus = 200;
             res.json(ret);
             return;
         }
         const xx = await pool.query('INSERT INTO PROFILI (EMAIL,IME,PREZIME,PASS) VALUES ($1,$2,$3,$4);',[req.body.email,req.body.ime,req.body.prezime,req.body.password]);  
         if (xx == 0){
             ret.msg = 'problem 1';
             res.sendStatus = 200;
             res.json(ret);
             return;
         }
         res.statusCode = 200;
         ret.msg = 'GG';
         res.json(ret);
         }
         //res.sendFile(publicPath+"/login/login.html");
         catch(err){
            console.log(err);
            res.statusCode = 200;
            ret.msg = 'Xd';
            res.json(ret);
     }
 
 });

 app.post('/create',async (req,res)=>{
    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
   
    try{
    jwt.verify(req.body.tkn,'aaaaaaaaaa')
    let email1 = jwt.decode(req.body.tkn).email
    
    const pool = new Pool(db_cred);
    const xx = await (await pool.query('SELECT last_value FROM debata_id_seq;')).rows;
    let xxx = parseInt(xx[0].last_value)+1;
    
    let meetingCreateUrl = bbb_api.administration.create(req.body.name.toString(),xxx, {
        duration: req.body.duration.toString(),
        attendeePW: 'secret',
        moderatorPW: 'supersecret',
        lockSettingsDisableMic: true
      })
      http1(meetingCreateUrl).then(async(result) => {
       
        let link_1 = bbb_api.administration.join('moderator', xxx, 'supersecret')
        let link_2 = bbb_api.administration.join('attendee', xxx, 'secret')
        let link_3 = bbb_api.administration.end(xxx, 'supersecret')
    
        const xx1 = await (await pool.query('INSERT INTO DEBATA (EMAIL,LINK_1,LINK_2,LINK_3,NAZIV,DUZINA,OPIS,DATUM,STAGE,KAT,PRIVATNA,PUSTI,reports) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,false,false,0);',[email1,link_1,link_2,link_3,req.body.name,req.body.duration,req.body.description,req.body.date,1,req.body.category])).rows;
        
        res.statusCode = 200;
        ret.msg = 'GG'; 
        res.json(ret);
        return;
    },
      (err)=>{console.log(err)
        res.statusCode = 200;
        ret.msg = 'problem 2';
        res.json(ret);
    
        }
      )
       
        }
      catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
      }

 });



 app.post('/profil',async (req,res)=>{

    let ret = {msg:'',data:null};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
       let email =  jwt.verify(req.body.tkn,'aaaaaaaaaa')
        const pool = new Pool(db_cred);
        let offset = (req.body.page-1)*10;
        const {rows} = await pool.query('SELECT NAZIV,LINK_1,LINK_3,LINK_2,ID,pusti,privatna,stage FROM DEBATA WHERE EMAIL = $1 OFFSET $2 LIMIT 10;',[email.email,offset]);
        if (rows.length==0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.data = rows;
        ret.msg = 'GG';
        if(req.body.bo == true){
            let xxx = await pool.query('SELECT COUNT(*) AS BR FROM DEBATA WHERE EMAIL = $1;',[email.email]);
            ret.pages = parseInt(parseInt(xxx.rows[0].br)/10) + 1;
        }
        res.json(ret);
        return;
    }
    catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
      }

 })
 app.post('/home',async (req,res)=>{

    let ret = {msg:'',data:null};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        let offset = (req.body.page-1)*10;
        const {rows} = await pool.query('SELECT d.id,d.NAZIV,d.LINK_2,e.ime,e.prezime FROM debata d INNER JOIN profili e on d.email = e.email where d.kat = $1 and d.stage=1 offset $2 limit 10;',[req.body.kat,offset]);
        if (rows.length==0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.data = rows;
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
      }

 })

 app.post('/debata',async (req,res)=>{

    let ret = {msg:'',data:null};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        const {rows} = await pool.query('SELECT e.ime,e.prezime,d.duzina,d.opis,d.datum,d.stage,d.kat,d.id FROM debata d INNER JOIN profili e on d.email = e.email where d.id=$1;',[req.body.id]);
        if (rows.length==0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.data = rows[0];
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
      }

 })

app.post('/setprivate',async (req,res)=>{

    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
       
        let email =  jwt.verify(req.body.tkn,'aaaaaaaaaa')
        const pool = new Pool(db_cred);
        let x = 0;
        if (req.body.private == true || req.body.private == false){
        const {rows} = await pool.query('UPDATE DEBATA SET PRIVATNA = $1 WHERE ID = $2 AND EMAIL = $3;',[req.body.private,req.body.id,email.email]);
            x = rows.length;
        }
        else if (req.body.pusti == true || req.body.pusti == false){
        const {rows} = await pool.query('UPDATE DEBATA SET PUSTI = $1 WHERE ID = $2 AND EMAIL = $3;',[req.body.pusti,req.body.id,email.email]);
            x = rows.length;
            }
        else{
            throw new Error('Nepostojece');
        }
        if (x==0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
      }

 }
) 

app.post('/ugasi',async (req,res)=>{
    
        let ret = {msg:''};
        if (!req.body){
            ret.msg = 'Neuspjesno';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
        try{
            let x = 0;
            const pool = new Pool(db_cred);
            if (req.body.pass){

                let xxx = (await pool.query('SELECT * FROM user WHERE PASS = $1;',[req.body.pass])).rows; 
                if (xxx.length==0){
                    res.statusCode = 200;
                    ret.msg = 'pr1';
                    res.json(ret);
                    return;
                }
                x = await (await pool.query('UPDATE DEBATA SET STAGE = 4 WHERE ID = $1;',([req.body.id]))).rows;
            }
            else{
                let email =  jwt.verify(req.body.tkn,'aaaaaaaaaa')
                 x = await (await pool.query('UPDATE DEBATA SET STAGE = 3 WHERE ID = $1 AND EMAIL = $2;',([req.body.id,email.email]))).rows;

            }
           
            
            if (x.length==0){
                res.statusCode = 200;
                ret.msg = 'pr1';
                res.json(ret);
                return;
            }
            res.statusCode = 200;
            ret.msg = 'GG';
            res.json(ret);
            return;
        }
        catch(error){
            console.log(error);
            res.statusCode = 200;
            ret.msg = 'Xd';
            res.json(ret);
        }
    
    }
)

app.post('/invitations',async (req,res)=>{

    let ret = {msg:'',data:null};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        let email =  jwt.verify(req.body.tkn,'aaaaaaaaaa')
        const pool = new Pool(db_cred);
        const {rows} = await pool.query('Select i.id,d.naziv,d.privatna from pozivnica i inner join debata d on i.id=d.id where prihvatio is null and i.primalac=$1;',[email.email]);
        if (rows.length==0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.data = rows;
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
      }

})

app.post('/accept',async (req,res)=>{
    
        let ret = {msg:'',data:null};
        if (!req.body){
            ret.msg = 'Neuspjesno';
            res.sendStatus = 200;
            res.json(ret);
            return;
        }
        try{
            let email =  jwt.verify(req.body.tkn,'aaaaaaaaaa')
            const pool = new Pool(db_cred);
            const {rows} = await pool.query('UPDATE pozivnica SET prihvatio = $1 WHERE id = $2 AND primalac=$3;',[req.body.prihvatio,req.body.id,email.email]);
          
            res.statusCode = 200;
            ret.msg = 'GG';
            res.json(ret);
            return;
        }
        catch(error){
            console.log(error);
            res.statusCode = 200;
            ret.msg = 'Xd';
            res.json(ret);
        }
    
})

app.post('/td',async (req,res)=>{

    let ret = {msg:'',data:null};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        let email =  jwt.verify(req.body.tkn,'aaaaaaaaaa')
        const pool = new Pool(db_cred);
        let x;
        if(req.body.kind == 0){
            x = (await pool.query('Select i.id,link_2,datum,naziv,privatna from debata d inner join pozivnica i on d.id = i.id where i.prihvatio = true and d.stage < 3 and i.primalac = $1;',[email.email])).rows;
        }
        if(x.length==0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.msg = 'GG';
        ret.data = x;
        res.json(ret);
        return;
    }
    catch(error){
        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
    }

})


app.post('/report',async (req,res)=>{

    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{

        const pool = new Pool(db_cred);
        const {rows} = await pool.query('UPDATE debata SET reports = reports + 1 WHERE id = $1;',[req.body.id]);
         
        if (rows.length == 0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){

        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
    }
})

app.post('/reports',async (req,res)=>{

    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{

        const pool = new Pool(db_cred);
        const {rows} = await pool.query('SELECT * FROM admin WHERE pass = $1;',[req.body.pass]);

        if (rows.length == 0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        offset = (req.body.page-1)*10;
        const xx = await (await pool.query('SELECT * from debata d inner join profili e on d.email=e.email where reports > 10 offset $1 limit 10',[offset])).rows;
         
        if (rows.length == 0){
            res.statusCode = 200;
            ret.msg = 'pr2';
            res.json(ret);
            return;
        }
        ret.data = xx;
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){

        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
    }
})


app.post('/loga',async (req,res)=>{

    let ret = {msg:''};
    if (!req.body){
        ret.msg = 'Neuspjesno';
        res.sendStatus = 200;
        res.json(ret);
        return;
    }
    try{
        const pool = new Pool(db_cred);
        const {rows} = await pool.query('SELECT * FROM admin WHERE pass = $1;',[req.body.pass]);

        if (rows.length == 0){
            res.statusCode = 200;
            ret.msg = 'pr1';
            res.json(ret);
            return;
        }
        res.statusCode = 200;
        ret.msg = 'GG';
        res.json(ret);
        return;
    }
    catch(error){

        console.log(error);
        res.statusCode = 200;
        ret.msg = 'Xd';
        res.json(ret);
    }
})


setInterval(function(){ 
    //this code runs every second 
    const pool = new Pool(db_cred);
    pool.query('UPDATE debata SET stage = stage + 1 WHERE stage = 1 and datum < LOCALTIMESTAMP;').then(
        (res)=>{},
        (err)=>{console.log(err);}
    );
}, 1000);
http.createServer(app).listen(3001);