import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from '@/clients/interfaces/client';
 
export const useClientStore = defineStore('ClientSetup', () => {

    const currentPage = ref<number>(1);
    const totalPages = ref<number>(5);
    const clients = ref<Client[]>([]);
 
    return{
        //State Properties
        currentPage, 
        totalPages,
        clients,

        //Getters

        //Actions
        setClients( newClients: Client[] ) {
            clients.value = newClients;
        },
        setPage( page: number ){
            if ( currentPage.value === page ) return;
            if ( page <= 0 ) return;
            if ( page > totalPages.value) return;

            currentPage.value = page;
        }
    }
});