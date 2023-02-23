import clientsApi from '@/api/clients-api';
import { useQuery } from '@tanstack/vue-query';
import { ref, watch } from 'vue';
import type { Client } from "../interfaces/client";


const getClient = async ( id: number ): Promise<Client> => {

    await new Promise( resolve => {
        setTimeout( () => resolve(true), 1500 )
    });

    const { data } = await clientsApi.get<Client>(`/clients/${ id }`);
    return data;
} 


const useClient = (id: number) => {

    const client = ref<Client>();

    const { isLoading, data, isError } = useQuery(
        ['client', id],
        () => getClient( id )
    )

    watch( data, () => {
        if (data.value)
            client.value = {...data.value};
    }, { immediate: true });

    return{
        isLoading,
        client,
        isError
    }
}

export default useClient;