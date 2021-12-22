export default function asyncHandler(code)
{
    return function(req,res,next){
        return Promise.resolve(code(req,res,next)).catch(next)
    }
}
