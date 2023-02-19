//Librerias de Vue
import { computed, ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';

//Interfaces
import type { Character } from '@/characters/interface/Character';

//Api
import breakingBadApi from '@/api/breakingBadApi';

const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null); 
const characterSet = ref<{[id: string] : Character}>({});


const getCharacter = async ( ID: string ):Promise<Character> =>{
    if( characterSet.value[ID] ){
        return characterSet.value[ID];
    }

    try{
        const { data } = await breakingBadApi.get<Character[]>(`/characters/${ID}`);

        if(data.length > 0) return data[0];

        throw new Error(`No se encontre una persona con el id: ${ ID }`)
    }
    catch (error: any){
        throw new Error(error);
    }
}

const loadedCharacter = ( character: Character ) => { 
    hasError.value = false;
    errorMessage.value = null;
    characterSet.value[character.char_id] = character;
}

const loadedWithError = (error: string) => {
    hasError.value = true;
    errorMessage.value = error;
}


const useCharacter = ( id: string ) => { 

    const { isLoading } = useQuery(
        ['characters', id ],
        () => getCharacter( id ),
        {
            onSuccess: loadedCharacter,
            onError: loadedWithError,
        }
    )


    return{
        //Propeties
        errorMessage,
        hasError,
        isLoading, 
        list: characterSet,

        //Getters
        character: computed( () => characterSet.value[id]),
        //Methods
    }

}

export default useCharacter;