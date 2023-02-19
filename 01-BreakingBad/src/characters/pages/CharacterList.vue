<script setup lang="ts">

import CardList from '@/characters/components/CardList.vue';
import useCharacter from '@/characters/composables/useCharacters'; 

const props = defineProps<{ title: string, visible: boolean}>();

const { isLoading, hasError, errorMessage, characters, count} = useCharacter();

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>

    <div v-else-if="hasError">
        <h1>Error de Carga</h1>
        <p>{{ errorMessage }}</p>
    </div>

    <template v-else>
        <h2>{{ props.title }} - ({{ count }})</h2>
        <CardList :characters="characters || []" />
    </template>
</template>