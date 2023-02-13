<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';


interface Props {
    title?: String;
    links?: RouterLink[];
    showIcon?: boolean;
}

const props = withDefaults(defineProps< Props >(), {
    showIcon: true,
    links: () => [],
})

</script>


<template>
    <nav>
        <img v-if="props.showIcon" src='@/assets/logo.svg' alt="Vue logo" height="25" width="25" />
        <span v-if="props.title">{{ props.title }}</span>

        <RouterLink
            v-for="link of props.links"
            :key="link.path"
            :to="link.path"
        >
            {{ link.title }}
        </RouterLink>
    </nav>
</template>

<style lang="scss" scoped>
nav{
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
    width: 100%;
}

img{
    margin-right: 5px;
}

span{
    margin-right: 10px;
}

a{
    margin-right: 5px;
}
</style>