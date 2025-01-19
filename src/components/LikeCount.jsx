

export const PostLikes = ( {postObj, allUserLikes } ) => {
    let count = 0;
    if(allUserLikes){
        const array = allUserLikes.filter(like => like.postId === postObj.id)
    
            count += array.length
            console.log(count)
        
            
            
        }
        return <div>Likes:{count}</div>

}