'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";
import { submitTask, updateTask ,deleteTaskFromDB, addNewBoard, updateBoard, deleteBoardFromDB} from './services/server/users';
import { signUpUser } from './services/server/users';

export async function addTask(formData){
    console.log("Data Came From Form",formData);
    const {board_id}=formData;
    const {error} = await submitTask(formData);
    if(error){
        throw new Error(error.message);
    }
    revalidatePath(`/board/${board_id}`)
}
export async function editTask(formData){
    console.log("Data Came From Form",formData);
    const {board_Id}=formData
    const {error} = await updateTask(formData);
    if(error){
        throw new Error(error.message)
    }
    revalidatePath(`/board/${board_Id}`)

}
export async function deleteTask(id,boardId){
    const {error} = deleteTaskFromDB(id);
    if(error){
        throw new Error(error.message)
    }
    revalidatePath(`/board/${boardId}`)
}
export async function addBoard(data){
    const {error} = await addNewBoard(data);
    if(error){
        throw new Error(error.message)
    }
    revalidatePath(`/`)
}
export async function editBoard(formData){
    console.log("Data Came From Form",formData);
    const {board_Id}=formData
    const {error} = await updateBoard(formData);
    if(error){
       throw new Error(error.message)
    }
    revalidatePath(`/board/${board_Id}`)
    revalidatePath('/')
}
export async function deleteBoard(id){
    const{error} = deleteBoardFromDB(id);
    if(error){
        throw new Error(error.message);
    }
    revalidatePath(`/`)
}
export async function login(formData){
    const supabase = await createClient()
    const data = {
        email:formData.email,
        password:formData.password
    }
    const { error } = await supabase.auth.signInWithPassword(data)
    if (error) {
        console.log(error);
        throw new Error(error.message);
    }
    revalidatePath('/')
}
export async function signUp(formData){
    const {error} = await signUpUser(formData)
    if(error)
    {
        console.log(error);
        throw new Error(error.message);
    }
    
    
}
export async function signOut(){
    const supabase = await createClient()
    const {error} = await supabase.auth.signOut()
    if(error)
        throw new Error(error.message);
}