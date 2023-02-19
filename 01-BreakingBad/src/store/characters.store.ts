import { reactive } from "vue";
import type { Character } from "@/characters/interface/Character";
import type { Error_Api } from "@/interface/Error_Api";
import breakingBadApi from '@/api/breakingBadApi';

interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        isError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list:{
            [id: string]: Character;
        };
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    //Metodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Character[] ) => void;
    loadCharactersFailed: ( error: Error_Api ) => void;

    //Metodos de Characters por ID
    startLoadingCharacter: (id: string) => void;
    checkIdInStore: (id: string) => boolean;
    loadedCharacter: (character: Character) => void;
    loadCharacterFailed: ( error: Error_Api ) => void;
}

//Initial State
const charactesStore = reactive<Store>({
    characters:{
        count: 0,
        errorMessage: null,
        isError: false,
        isLoading: true,
        list: []
    },
    ids:{
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null,
    },

    //Metodos de Characters

    async startLoadingCharacters () {
        const { data } = await breakingBadApi.get<Character[]>('/characters');
        this.loadedCharacters( data )
    },
    loadedCharacters( data: Character[] ){
        const charaters = data.filter( character => ![14,17,39].includes(character.char_id));

        this.characters = {
            count: charaters.length,
            errorMessage: null,
            isError: false,
            isLoading: false,
            list: charaters
        }
    },
    loadCharactersFailed( error: Error_Api){
        this.characters = {
            count: 0,
            errorMessage: error.message,
            isError: true,
            isLoading: false,
            list: []
        }
    },

    //Metodos de ID Characters

    async startLoadingCharacter(id: string){
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null,
        }
    },
    checkIdInStore(id: string){
        return !!this.ids.list[id];
    },
    loadedCharacter(character: Character){
        this.ids.isLoading = false;
        this.ids.list[character.char_id] = character;
    },
    loadCharacterFailed(error: Error_Api){
        this.ids.isLoading = false;
        this.ids.hasError = true;
        this.ids.errorMessage = error.message;
    }

});

charactesStore.startLoadingCharacters();

export default charactesStore;
