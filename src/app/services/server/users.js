import { createClient } from '@/utils/supabase/server';
export async function getFullUser(){
    
    const supabase =  await createClient();
    const { data } = await supabase.auth.getUser();
    const {id} = data.user;
    let { data: userData, error } = await supabase
        .from('users')
        .select("*")
        .eq('auth_id', id).single();
    if(error){
        console.log(error);
    }
    return userData;

    
}
export async function signUpUser(user){
    console.log("SIGN UP CALLED", user);

    const {name,email,password} = user;
    const supabase =  await createClient();
    const { error,data } = await supabase.auth.signUp({email,password,options: {
        data: {
            name
        },
    },});
    
    return {error};

}

export async function signOutUser(){
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut();
    user = null;
    return {error}
}
export async function getUserTasks(id){
    const supabase = await createClient();
    let {data:tasks,error} = await supabase.from('tasks').select('*').eq('auth_id',id);
    if(error){
        console.log(error);
    }
    return tasks;
}

export async function submitTask(task){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('tasks')
    .insert([
        task 
    ])
    console.log("Submit Task Processing... ")
    if(!error){
        console.log("Task Is Inserted Successfuly");
    }else{
        console.error(error);
    }
    return {data,error}
}
export async function updateTask(task){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('tasks')
    .update(
        task 
    ).eq("id",task.id)
    console.log("Updating Task Processing... ")
    if(!error){
        console.log("Task Is Updated Successfuly");
    }else{
        console.error(error);
    }
    return {data,error}
}
export async function deleteTaskFromDB(id){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('tasks')
    .delete().eq("id",id)
    console.log("Deleting Task Processing... ")
    if(!error){
        console.log("Task Is Deleted Successfuly");
    }else{
        console.error(error);
    }
    return {data,error}
}
export async function updateBoard(board){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('board')
    .update(
        board
    ).eq("id",board.id)
    console.log("Updating Board Processing... ")
    if(!error){
        console.log("Board Is Updated Successfuly");
    }else{
        console.error(error);
    }
    return {data,error}
}
export async function deleteBoardFromDB(id){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('board')
    .delete().eq("id",id)
    console.log("Deleting Board Processing... ")
    if(!error){
        console.log("Board Is Deleted Successfuly");
    }else{
        console.error(error);
    }
    return {data,error}
}

export async function getBoards(userId){
   
    const supabase = await createClient();
    let {data:boards,error} = await supabase.from('board').select('*').eq('user_id',userId);
    setTimeout(()=>console.log("Wait"),5000)
    return {boards,error};
}

export async function getBoard(boardId){
    const supabase = await createClient();
    let {data:board,error} = await supabase.from('board').select('*').eq('id',boardId).single();
    
    if(error){
        console.log(error)
    }
    console.log(board);
    return board;
}

export async function getBoardTasks(boardId){
    const supabase = await createClient();
    let {data:tasks,error} = await supabase.from('tasks').select('*').eq('board_id',boardId);
    if(error){
        console.log(error)
    }
    return tasks; 
}
export async function addNewBoard(board){
    const supabase = await createClient();
    const { data, error } = await supabase
    .from('board')
    .insert([
        board
    ])
    console.log("Submit Board Processing... ")
    if(!error){
        console.log("Board Is Inserted Successfuly");
    }else{
        console.error(error);
    }
    return {error}
}
