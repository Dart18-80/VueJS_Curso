<script setup lang="ts">

</script>


<template>
    <nav>
        <img src="@/assets/logo.svg" alt="Vue logo" height="25" width="25" />
        <span>Algo</span>

        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink>
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