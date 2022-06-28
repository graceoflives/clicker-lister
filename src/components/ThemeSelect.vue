<template>
  <div class="theme-select">
    <label class="theme" v-for="(v, k) in themeName" :key="k">
      <input type="radio" v-model="theme" name="theme" :value="v.value" />
      <radio-checked v-if="theme === v.value" class="icon"/>
      <radio-unchecked v-else class="icon" />
      {{ v.label }}
    </label>
  </div>
</template>

<script>
import RadioChecked from '@/assets/radio-checked.svg?component';
import RadioUnchecked from '@/assets/radio-unchecked.svg?component';

export default {
  name: 'ThemeSelect',
  data: () => ({
    themeName: [
      { value: 'dark', label: 'Dark theme' },
      { value: 'light', label: 'Light theme' },
    ],
  }),
  components: {
    RadioChecked, RadioUnchecked
  },
  computed: {
    theme: {
      get() {
        return this.$store.getters.getTheme;
      },
      set(value) {
        this.$store.dispatch('setTheme', value);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.theme-select {
  display: flex;
  align-items: center;
  justify-content: center;

  >.theme {
    flex: 0;
    display: flex;
    align-items: center;
    margin: 10px;
    white-space: nowrap;

    >input {
      display: none;
    }

    >.icon {
      width: 15px;
      margin-right: 4px;
    }
  }
}
</style>
