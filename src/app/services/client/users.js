import { createClient } from '@/utils/supabase/client';

export async function getFullUser(){
    const supabase =  await createClient();
    const { data:{user} } = await supabase.auth.getUser();
    if(user){
        const {id} = user;
        console.log(user);
        let { data: userData, error } = await supabase
            .from('users')
            .select("*")
            .eq('auth_id', id).single();
        if(error){
            console.log(error);
        }
        console.log(userData);
        return userData;
    }
    return null;
}

