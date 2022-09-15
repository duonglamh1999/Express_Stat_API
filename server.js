const express = require('express');
const ExpressError = require('./expressError');
const app = express();
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helper');
app.use(express.json())
const parse = (queryNums)=>{
    if (!queryNums){
        throw new ExpressError ("add number brother",400)
    }
    let arr=queryNums.split(",");
    let nums = convertAndValidateNumsArray(arr)
    if(nums instanceof Error){
        throw new ExpressError(nums.message)
    }
    return nums
}
app.get ('/mean',(req,res,next)=> {
    const nums = parse(req.query.nums)
    return res.send({
        operation:"mean",
        value:findMean(nums)
    })
})

app.get ('/median',(req,res,next)=> {
    const nums = parse(req.query.nums)
    return res.send({
        operation:"median",
        value:findMedian(nums)
    })
})

app.get ('/mode',(req,res,next)=> {
    const nums = parse(req.query.nums)
    return res.send({
        operation:"mode",
        value:findMode(nums)
    })
})


app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });
  
  /** general error handler */
  
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });
  
app.listen(3000,function(){
    console.log('started')
})
