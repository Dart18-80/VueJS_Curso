<script setup lang="ts">
/*import { ref } from 'vue';
import breakingBadApi from '@/api/breakingBadApi';
import type { Character } from '../interface/Character';*/
import { useCharacters } from '@/characters/composables/useCharacters'

const {isLoading, characters, hasError, errorMessage} = useCharacters();

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-if="hasError">{{errorMessage}}</h1>
    <ul>
        <li 
            v-for="character of characters"
            :key="character.char_id">
            {{ character.name }}
        </li>
    </ul>
</template>
