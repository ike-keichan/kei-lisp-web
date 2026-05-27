import { ref, type Ref } from 'vue';

const replOutput = ref('');

export const useReplOutput = (): Ref<string> => replOutput;
