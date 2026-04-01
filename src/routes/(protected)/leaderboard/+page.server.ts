import { pb } from '$lib/pocketbase';

export const load = async () => {
  
    const users = await pb.collection('users').getFullList({
        sort: '-created',
        fields: 'id,name' 
    });

    const allCredits = await pb.collection('credits').getFullList();

    return {
        users,
        allCredits
    };
};