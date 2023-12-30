// function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// }

//Same

module.exports = (fn)=>{
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}