import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Client } from '@/clients/interfaces/client';
 
export const useClientStore = defineStore('ClientSetup', () => {

    const currentPage = ref<number>(1);
    const totalPafes = ref<number>(5);
    const clients = ref<Client[]>();
 
    return{
        //State Properties
        currentPage, 
        totalPafes,
        clients,

        //Getters

        //Actions
        setClient( newClients: Client[]){
            clients.value = newClients;
        },
        setPage( page: number ){
            if ( currentPage.value === page ) return;

            currentPage.value = page;
        }
    }
});