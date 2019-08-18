<template>
    <div>
        this is for my test dialog
        <button v-on:click="closeDialog">close</button>
        <button v-on:click="success">success</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'this is my test dialog'
            };
        },
        methods: {
            closeDialog() {
                this.$listeners.cancel();
            },
            success() {
                this.$listeners.done();
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
