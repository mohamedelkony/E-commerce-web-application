/*
instead of writing try catch block inside every middleware 
pass it to async handler 
which calles the middleware inside try catch automatically
*/
export default function asyncHandler(code)
{
    return function(req,res,next){
        return Promise.resolve(code(req,res,next)).catch(next)
    }
}
