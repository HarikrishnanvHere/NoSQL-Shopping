let Expense = require('../models/expense');
let User = require('../models/user');
let DownloadUrl = require('../models/downloadUrl');


let cors = require('cors');
let express = require('express');
let app = express();
app.use(cors());

let AWS = require('aws-sdk');
let dotenv = require('dotenv');
const { SendReport } = require('sib-api-v3-sdk');
dotenv.config();


exports.postExpense = async (req,res,next) =>{
    try{
        

        let {amount,description,category} = req.body;
        let expense = new Expense({
            amount: amount,
            description: description,
            category: category,
            userId: req.user
        })
        await req.user.addAmount(amount);
        await expense.save().then((data)=>{
            //console.log(data);
            res.status(201).json({data: data});
        });
        //Promise.all([promise1,promise2]).then(data=>res.status(200).json({data: data[0]})).catch(err=>res.status(400).json({message: "Invalid Entry"}));
    }
    catch (err){
        console.log(err);
        res.status(500).json({message: "Something went wrong! please try again"})
    }
    
}

exports.getExpense =async  (req,res,next) =>{
    try{

        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        let totalItems;
        await Expense.find({'userId': req.user._id}).then((data)=>{
            totalItems = data.length;
        })

        // console.log(page, pageSize, totalItems);

        let isPremium = req.user.isPremiumUser;
        // console.log(isPremium);

        await Expense.find({'userId': req.user._id}).skip((page -1)*pageSize).limit(pageSize)
        // req.user.getExpenses({offset: (page -1) * pageSize, limit: pageSize})
        .then((expenses)=>{
            //console.log(expenses)
            res.status(200).json({
                data:expenses, 
                currentPage: page,
                hasNextPage: pageSize * page < totalItems,
                nextPage: page + 1,
                hasPreviousPage: page > 1,
                previousPage: page - 1,
                lastPage: Math.ceil(totalItems / pageSize),
                premium: isPremium
            });
            
        })
        .catch(err=>console.log(err));
    }
    catch(err){
        console.log(err);
        res.send("Not Authorized");
    }
}

exports.deleteExpense = async (req,res,next) =>{
    try{

        let expenseId = req.params.expenseId; 
        console.log(expenseId);
        let expense = await Expense.findById(expenseId);
        await req.user.deductAmount(expense.amount);
        Expense.findByIdAndDelete(expenseId)
        .then(() => {
        console.log('DESTROYED EXPENSE!');
        res.status(204).json({'message': 'DELETED!'})
        })
        .catch(err => console.log(err));

        // console.log(expense);
        
        // let updatedAmount =  parseInt(req.user.total) - parseInt(expense.amount);
        // await expense.destroy({transaction: t});
        // await req.user.update({total : updatedAmount}, {transaction: t});
        // await t.commit();
        // res.status(204).json({message: "Deletion Successful"});


    }
    catch(err){
        
        res.status(500).json({message: "something went wrong"});
    }
    
}


async function uploadToS3 (data, fileName){
    let AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
    let AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    let AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

    let s3bucket = new AWS.S3({
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    })

    
    var params = {
        Bucket: AWS_BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    }
    return new Promise ((resolve, reject) =>{
        s3bucket.upload(params, (err, s3response) =>{
            if(err){
                reject(err);
            }
            else{
                console.log("success",s3response);
                resolve(s3response.Location);
            }
        })
    
    }) 
     
    
  
}

exports.downloadExpense = async (req,res,next) =>{
    try{
        if(req.user.isPremiumUser != true){
            res.json({message: "Not Authorized"});
            res.end();
        }
        else{
            const userId = req.user._id;
            const expenses = await await Expense.find({'userId': req.user._id});
            console.log(expenses);
            const stringifiedExpenses = JSON.stringify(expenses);
            const fileName = `Expenses${userId}/${new Date}.txt`;
            const fileNameSplit = fileName.split('/');
            const dataName = fileNameSplit[1];
            const fileUrl = await uploadToS3(stringifiedExpenses,fileName);
            let downloadUrl =new DownloadUrl({
                url: fileUrl,
                fileName: dataName,
                userId: req.user
            })
            await downloadUrl.save();
            // await req.user.createDownloadUrl({
            //     url: fileUrl,
            //     filename: dataName
            // })
            let previouslyDownloaded = await DownloadUrl.find({'userId': req.user._id});
            res.status(200).json({url: fileUrl, previouslyDownloaded, message: "success"})
        }
    }
    catch(err){
        res.status(401).json({message: "Server Error!"})
    }
    
}