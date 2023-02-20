import { useQuery } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { watch, computed } from 'vue';

import clientsApi from "@/api/clients-api";
import { useClientStore } from '@/store/clients';
import type { Client } from "@/clients/interfaces/client";


const getClients = async ( page: number ) :Promise<Client[]> => {

    await new Promise( resolve => {
        setTimeout( () => resolve(true), 1500 )
    });

    const { data } = await clientsApi.get<Client[]>(`/clients?_page=${ page }`);
    return data;
}


const useClients = () => {

    const ClientStore = useClientStore();
    const { clients, currentPage, totalPages } = storeToRefs( ClientStore );

    const { isLoading, data } =  useQuery(
        ['clients?page=', currentPage],
        () => getClients( currentPage.value ),
        {
            //staleTime: 1000 * 60,
        }
    );

    watch( data, clients => {
        if( clients )
            ClientStore.setClients( clients );
    });

    return {
        clients,
        currentPage,
        isLoading,
        totalPages,

        //Methods 
        getPage( page: number) {
            ClientStore.setPage( page )
        },

        //getters
        /* totalPageNumbers: computed(
            () => [...new Array(totalPages.value)].map( ( v, i ) => i + 1 )
        ), */
    }
}

export default useClients;