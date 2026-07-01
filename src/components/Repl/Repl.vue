<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { LispInterpreter, Cons, KeiLispError } from 'kei-lisp';
import { createGraphicsPlugin } from 'kei-lisp-plugin-graphics';
import { useReplOutput } from '../../composables/useReplOutput';

const interpreter = new LispInterpreter();
const replOutput = useReplOutput();

const inputEl = ref<HTMLInputElement | null>(null);
const canvasEl = ref<HTMLCanvasElement | null>(null);
const input = ref('');
const buffer = ref('');
const history = ref<string[]>([]);
const historyIndex = ref(0);
const leftParentheses = ref(0);

const output = computed(() => replOutput.value);
const prompt = computed(() => (leftParentheses.value > 0 ? '. . .  ' : '>>   '));

const print = (s: string): void => {
  replOutput.value += s;
};

const exec = (): void => {
  buffer.value += ' ';
  for (const ch of input.value) {
    if (ch === '(') leftParentheses.value++;
    else if (ch === ')') leftParentheses.value--;
    buffer.value += ch;
  }

  print(prompt.value + input.value + '\n');

  if (leftParentheses.value <= 0) {
    try {
      const aCons = interpreter.parse(buffer.value);
      for (const each of aCons.loop()) {
        print(String(interpreter.eval(each)) + '\n');
      }
    } catch (error) {
      const msg = error instanceof KeiLispError ? error.message : String(error);
      print('*** ' + msg + ' ***\n');
      print(Cons.nil.toString() + '\n');
    }
    leftParentheses.value = 0;
    buffer.value = '';
  }

  if (input.value.trim() !== '') {
    history.value.push(input.value);
  }
  input.value = '';
  historyIndex.value = history.value.length;
};

const historyPrev = (): void => {
  if (historyIndex.value > 0) historyIndex.value--;
  const entry = history.value[historyIndex.value];
  if (entry !== undefined) input.value = entry;
};

const historyNext = (): void => {
  if (historyIndex.value < history.value.length) historyIndex.value++;
  if (historyIndex.value >= history.value.length) {
    input.value = '';
  } else {
    const entry = history.value[historyIndex.value];
    if (entry !== undefined) input.value = entry;
  }
};

onMounted(() => {
  if (canvasEl.value) {
    interpreter.use(createGraphicsPlugin({ canvas: canvasEl.value }));
  }
  inputEl.value?.focus();
  document.documentElement.addEventListener('click', () => {
    inputEl.value?.focus();
  });
});
</script>

<template>
  <div class="repl">
    <h4>
      Hello! This is an interpreter that mimics Lisp, "KeiLisp".<br />
      2021.1.1 created by Keisuke Ikeda.
    </h4>
    <pre>{{ output }}{{ prompt }}<input
        ref="inputEl"
        v-model="input"
        type="text"
        autocomplete="off"
        @keypress.enter.prevent="exec"
        @keydown.up.prevent="historyPrev"
        @keydown.down.prevent="historyNext"
      /></pre>
    <canvas ref="canvasEl" class="stage" width="600" height="300"></canvas>
  </div>
</template>

<style scoped>
.repl {
  font-size: 1.17em;
  font-weight: bold;
  font-family: 'Ricty Diminished Discord', monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: start;
}

.repl input {
  width: 95%;
  border: none;
  font-size: 100%;
  font-weight: inherit;
  font-family: inherit;
  outline: none;
}

.stage {
  display: block;
  margin-top: 1em;
}
</style>
