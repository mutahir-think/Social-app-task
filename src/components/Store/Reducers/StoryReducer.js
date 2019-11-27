import StoryData from '../States/StoryState';

const StoryReducer = (state=StoryData,action) =>{
    switch (action.type) {
        case 'CREATE':
            return{
                storyData:state.storyData.concat(action.payload)
            }
    
        default:
            return state;
    }
}
export default StoryReducer;