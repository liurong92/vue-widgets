<template>
    <div>
        this is init todo page
        <div>{{message}}</div>
        <div>{{this.$store.state.todoPage.message}}</div>
        <div v-on:click="openDialog">open dialog</div>
        <div v-on:click="openDialog1">open dialog</div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import TestDialog from './test/test.component.vue';

    export default {
        name: 'Todo',
        props: ['todo'],
        data() {
            return {
                message: 'this is first'
            };
        },
        mounted() {
            this.getTodoMessage();
        },
        methods: {
            ...mapActions([
                'getTodoMessage'
            ]),
            openDialog() {
                this.$dialog({
                    title: 'Delete cell',
                    component: () => <TestDialog/>
                });
            },
            openDialog1() {
                this.$dialog({
                    title: 'Delete celddddddl',
                    component: () => <TestDialog/>,
                    onSuccess: () => {
                        console.log('this is success function')
                    }
                });
            }
        }
    };
</script>

<style>
</style>
