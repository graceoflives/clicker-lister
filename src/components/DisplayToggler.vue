<template>
  <div class="display-toggler">
    <label>Display:</label>
    <button v-for="(item, index) in display" :class="item.visible ? 'on' : 'off'" @click="toggleDisplay(item.name)"
      :key="index">
      <eye v-if="item.visible" class="icon" />
      <no-eye v-else class="icon" />
      <span>{{ item.label }}</span>
    </button>
  </div>
</template>

<script>
import Eye from '@/assets/eye.svg?component';
import NoEye from '@/assets/invisible.svg?component';
import { mapGetters } from 'vuex';

export default {
  name: 'DisplayToggler',
  components: { Eye, NoEye },
  computed: {
    ...mapGetters({
      display: 'getDisplay',
    }),
  },
  methods: {
    toggleDisplay(displayName) {
      this.$store.dispatch('toggleDisplay', displayName);
    },
  },
};
</script>

<style scoped lang="scss">
.display-toggler {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  >button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 8px;
    border: 0;
    border-radius: 4px;
    padding: 8px 12px;
    color: var(--color);

    &.on {
      background-color: var(--btn-bg-color);

      &:hover {
        background-color: var(--btn-bg-color-hover);
      }
    }

    &.off {
      background-color: var(--btn-bg-color-inactive);

      &:hover {
        background-color: var(--btn-bg-color-inactive-hover);
      }
    }

    >.icon {
      width: 15px;
      margin-right: 4px;
    }
  }
}
</style>
