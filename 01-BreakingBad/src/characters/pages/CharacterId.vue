<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '@/characters/composables/useCharacter';
import { isError } from '@tanstack/query-core';

const route = useRoute();
const router = useRouter();

const { id } = route.params as { id: string};

const { character, isLoading, hasError, errorMessage } = useCharacter( id );

watchEffect( () => {
    if( !isLoading.value && hasError.value){
        router.replace('/characters');
    }
})

</script>

<template>
    <h1>Character List {{ id }}</h1>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>
    <div v-else-if="character">
        <h2>{{ character.name }}</h2>
        <div class="character-container">
            <img :src="character.img" :alt="character.name ">
            <ul>
                <li>Apodo: {{ character.nickname }}</li>
                <li>Nacio: {{ character.birthday }}</li>
                <li>Serie: {{ character.category }}</li>
                <li>Ocupacion: {{ character.occupation.join(', ') }}</li>
                <li>Actor: {{ character.portrayed }}</li>
                <li>Estado: {{ character.status }}</li>
                <li>Temporadas: {{ character.appearance.join(', ') }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>

.character-container{
    display: flex;
    flex-direction: row;
}

img{
    width: 150px;
    border-radius: 5px;
}

</style>