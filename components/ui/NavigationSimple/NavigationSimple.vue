<template>
  <nav class="flex justify-center w-full py-2 px-4 lg:py-5 lg:px-6 bg-primary-700 border-b border-neutral-200">
    <div
      class="flex flex-wrap justify-between lg:flex-nowrap items-center flex-row md:justify-start h-full max-w-[1536px] w-full"
    >
      <SfButton
        aria-label="Open Burger Menu"
        class="hidden xs:block text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 lg:hidden order-first lg:order-1 mr-4"
        square
        variant="tertiary"
        @click="burgerOpen = true"
      >
        <SfIconMenu />
      </SfButton>
      <SfButton
        variant="secondary"
        :tag="RouterLink"
        :to="nav.logo.link"
        :aria-label="nav.title"
        class="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm bg-primary-200 hover:bg-primary-400 active:bg-primary-600 shrink-0"
      >
        <NuxtImg
          loading="lazy"
          format="webp"
          :src="nav.logo.src"
          :alt="nav.logo.alt"
          crossorigin="anonymous"
          class="max-w-[4.5rem] md:max-h-6 md:max-w-[176px] lg:max-h-[2.15rem]"
        />
        <h1 class="text-secondary-700">
          {{ nav.title }}
        </h1>
      </SfButton>
      <form
        role="search"
        class="md:hidden flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
        @submit.prevent=search
      >
        <SfInput
          v-model="inputValue"
          type="search"
          class="[&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search"
          wrapper-class="flex-1 h-10 pr-0"
          size="base"
        >
          <template #suffix>
            <span class="flex items-center">
              <SfButton
                variant="tertiary"
                square
                aria-label="search"
                type="submit"
                class="md:hidden text-secondary"
              >
                <SfIconSearch />
              </SfButton>
            </span>
          </template>
        </SfInput>
      </form>
      <transition
        enter-active-class="transition duration-500 ease-in-out"
        leave-active-class="transition duration-500 ease-in-out"
        enter-from-class="-translate-x-full"
        enter-to-class="translate-x-0"
        leave-from-class="translate-x-0"
        leave-to-class="-translate-x-full"
      >
        <SfDrawer
          ref="drawerRef"
          v-model="burgerOpen"
          :placement="placement"
          :class="[
            'bg-neutral-50',
            'border',
            'border-gray-300',
            { 'max-w-[370px]': placement === 'left' || placement === 'right' },
          ]"
        >
          <header class="flex z-50 items-center justify-between px-10 py-6 bg-primary-700">
            <div class="flex items-center text-white">
              <a
                :href="nav.logo.link"
                :aria-label="nav.logo.ariaLabel"
                class="inline-block mr-4 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm shrink-0"
              >
                <NuxtImg
                  loading="lazy"
                  format="webp"
                  :src="nav.logo.src"
                  :alt="nav.logo.alt"
                  width="8.7rem"
                  height="1.7rem"
                  crossorigin="anonymous"
                />
                <h3 class="text-white-500">
                  {{ nav.title }}
                </h3>
              </a>
            </div>
            <SfButton square variant="tertiary" class="text-white" @click="burgerOpen = false">
              <SfIconClose />
            </SfButton>
          </header>
          <div class="p-5 px-10">
            <ul
              class="p-2 rounded bg-gray-100"
              v-for="actionItem in nav.navDropdown.actionItems"
              :key="actionItem.id"
            >
              <SfLink>
                <SfButton
                  class="text-black hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5 rounded-md"
                  :aria-label="actionItem.title"
                  variant="tertiary"
                  square
                  :tag="RouterLink"
                  :to="`/${nav.navDropdown.linkBase}/${actionItem.handle}`"
                  @click="burgerOpen = false"
                >
                  {{ actionItem.title }}
                </SfButton>
              </SfLink>
            </ul>
          </div>
        </SfDrawer>
      </transition> 
      <SfDropdown v-model="isOpen">
        <template #trigger>
          <SfButton
            class="hidden lg:flex text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 lg:mr-4"
            type="button"
            variant="tertiary"
            @click="toggle()"
          >
            <template #suffix>
              <SfIconExpandMore class="hidden lg:block" />
            </template>
            <span class="hidden lg:flex whitespace-nowrap">{{nav.navDropdown.title}}</span>
          </SfButton>
        </template>
        <ul
          class="p-2 rounded bg-gray-100"
          v-for="actionItem in nav.navDropdown.actionItems"
          :key="actionItem.id"
        >
          <SfListItem>
            <SfButton
              class="text-black hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 mr-2 -ml-0.5"
              :aria-label="actionItem.title"
              variant="tertiary"
              square
              :tag="RouterLink"
              :to="`/${nav.navDropdown.linkBase}/${actionItem.handle}`"
              @click="toggle()"
            >
              {{ actionItem.title }}
            </SfButton>
          </SfListItem>
        </ul>
      </SfDropdown>
      <form
        role="search"
        class="hidden md:flex flex-[100%] order-last lg:order-3 mt-2 lg:mt-0 pb-2 lg:pb-0"
        @submit.prevent=search
      >
        <SfInput
          v-model="inputValue"
          type="search"
          class="[&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Search"
          wrapper-class="flex-1 h-10 pr-0"
          size="base"
        >
          <template #suffix>
            <span class="flex items-center">
              <SfButton
                variant="tertiary"
                square
                aria-label="search"
                type="submit"
                class="rounded-l-none hover:bg-transparent active:bg-transparent"
              >
                <SfIconSearch />
              </SfButton>
            </span>
          </template>
        </SfInput>
      </form>
      <CartIcon class="hidden xs:flex flex-1 justify-end lg:order-last lg:ml-4 text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-900 rounded-md" />
    </div>
  </nav>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import {
  SfButton,
  SfDrawer,
  SfDrawerPlacement,
  SfDropdown,
  SfIconExpandMore,
  SfInput,
  SfIconClose,
  SfIconSearch,
  SfIconMenu,
  SfLink,
  SfListItem,
  useDisclosure,
  useTrapFocus
} from '@storefront-ui/vue';

defineProps<{nav: any,cartCounter: any}>()


const emit = defineEmits<{
  (searchEvent:any, event:any): void;
  (navEvent:any, role:any): void;
}>()

const inputValue = ref('')

const search = () => {
  emit('searchEvent', inputValue.value)
}
const placement = ref<`${SfDrawerPlacement}`>('left');
const burgerOpen = ref(false);
const drawerRef = ref();

useTrapFocus(drawerRef, { activeState: burgerOpen });

const { isOpen, toggle } = useDisclosure();
</script>
