const catchAsync = require('../utils/catchAsync');
const Features = require('../utils/features')

exports.GetAll = model => catchAsync(async(req,res,next)=>{

    let query = model.find();

    const features = new Features(query,req.query);
    features
        .filter()
        .sort()
        .fields()
        .paginate();
  
    
    // EXECUTE QUERY
    const result = await features.query;
    console.log(result)
    res
        .status(200)
        .json({
            status: 'success',
            results: result.length,
            data: result
        })
}) 

exports.Get = model => catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    const result = await model.findById(id)
    res.status(200).json({
        status: 'success',
        data: result
    })
}) 

exports.Create = model => catchAsync(async(req,res,next)=>{

    const result = await model.create(req.body)
    res.status(201).json({
        status: 'success',
        data:result
    })

}) 

exports.Update = model =>  catchAsync(async(req,res,next)=>{
    const id = req.user._id;
    const result  = await model.findByIdAndUpdate(id,req.body,{
        new: true,
        runValidators:true
    });

    res.status(202).json({
        status: 'success',
        data: result
    })

}) 

exports.Delete = model =>  catchAsync(async(req,res,next)=>{
    const id = req.params.id;
    const result = await model.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        data: `deleted Count: ${result?1:0}`
    })
}) 