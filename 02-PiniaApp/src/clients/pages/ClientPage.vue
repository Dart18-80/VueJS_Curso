<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import clientsApi from '@/api/clients-api';
import LoadingModal from '@/shared/components/LoadingModal.vue';
import useClient from '../composables/useClient';
import type { Client } from '../interfaces/client';

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();
const { isLoading, client, isError} = useClient( +route.params.id );

const updateClient = async( client: Client): Promise<Client> =>{
    await new Promise( resolve => {
        setTimeout( () => resolve(true), 2000 )
    });

    const { data } = await clientsApi.patch<Client>(`/clients/${ client.id }`, client);
    const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false });
    queries.forEach(query => query.fetch());
    return data;
}

const clientMutation = useMutation( updateClient );

watch( clientMutation.isSuccess, () => {
    setTimeout(() => {
        clientMutation.reset();
    }, 2000)
})

watch( isError, () => {
    if( isError.value ){
        router.replace('/clients');
    }
})

</script>

<template>
    <h3 v-if="clientMutation.isLoading.value">Guardando...</h3>
    <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>

    <LoadingModal v-if="isLoading" />

    <div v-if="client">
        <h1>{{ client.name }}</h1>
        <form @submit.prevent="clientMutation.mutate(client!)">

            <input 
                type="text"
                placeholder="Nombre"
                v-model="client.name"/>
            <br>
            <input 
                type="text"
                placeholder="Direccion"
                v-model="client.address"/>
            
            <button 
                type="submit"
                :disabled="clientMutation.isLoading.value">
                Guardar
            </button>
        </form>
    </div>

    <code>
        {{ client }}
    </code>
</template>

<style scoped>
input{
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}

button{
    margin-bottom: 10px;
}
</style>