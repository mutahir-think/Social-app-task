export const createStory = (data) =>{
    console.log(data);
    return(dispatch)=>{
        dispatch({type:'CREATE',payload:data})
    }
}