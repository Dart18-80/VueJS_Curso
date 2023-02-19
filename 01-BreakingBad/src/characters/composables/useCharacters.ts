//Librerias Vue
import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

//Interfaces
import type { Character } from '@/characters/interface/Character';

//Api
import breakingBadApi from '@/api/breakingBadApi';



const characters = ref<Character[]>([])
const isLoading = ref<boolean>(false);
const hasError = ref<boolean>(false); 
const errorMessage = ref<string | null>(null); 

const getCharacters = async (): Promise<Character[]> => {

    if( characters.value.length > 0 ) {
        return characters.value;
    }

    const { data } = await breakingBadApi.get<Character[]>('/characters');
    return data;
}

const loadedCharacters = ( data: Character[]) => {
    hasError.value = false;
    errorMessage.value = null;
    characters.value = data.filter( character => ![14, 17, 39].includes(character.char_id));
}

const useCharacter = () => {

    useQuery(
        ['characters'],
        getCharacters,
        {
            onSuccess: loadedCharacters,
        }
    ); 

    return{
        //Propeties
        characters, 
        errorMessage,
        hasError,
        isLoading,

        //Getters
        count: computed( () => characters.value.length),
        //Methods
    }
}

export default useCharacter