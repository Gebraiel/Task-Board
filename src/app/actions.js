'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";
import { submitTask, updateTask ,deleteTaskFromDB, addNewBoard, updateBoard, deleteBoardFromDB,signOutUser} from './services/server/users';
import { signUpUser } from './services/server/users';

export async function addTask(formData){
    console.log("Data Came From Form",formData);
    const {board_id}=formData;
    const {error} = await submitTask(formData);
    
    revalidatePath(`/board/${board_id}`)
    return error?.message;

}
export async function editTask(formData){
    console.log("Data Came From Form",formData);
    const {board_Id}=formData
    const {error} = await updateTask(formData);
 
    revalidatePath(`/board/${board_Id}`)
    return error?.message;


}
export async function deleteTask(id,boardId){
    const {error} = deleteTaskFromDB(id);
    revalidatePath(`/board/${boardId}`)
    return error?.message;

}
export async function addBoard(data){
    const {error} = await addNewBoard(data);
    revalidatePath(`/`)
    return error?.message;

}
export async function editBoard(formData){
    console.log("Data Came From Form",formData);
    const {id}=formData;
    console.log("Board id:",id)
    const {error} = await updateBoard(formData);
    revalidatePath(`/board/${id}`)
    revalidatePath('/')
    return error?.message;

}
export async function deleteBoard(id){
    const{error} = deleteBoardFromDB(id);
    
    revalidatePath(`/`)
    return error?.message;

}
export async function login(formData){
    const supabase = await createClient()
    const data = {
        email:formData.email,
        password:formData.password
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    revalidatePath('/')
    return error?.message;
}
export async function signUp(formData){
    const {error} = await signUpUser(formData)
    return error?.message;
}
export async function signOut(){
    const {error}=signOutUser()
    if(error)
        throw new Error(error.message);
    revalidatePath('/')
}