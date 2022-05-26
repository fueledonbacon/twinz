<template>
    <div class="mx-auto">
    <ul class="text-white flex flex-row text-center my-4 justify-center">
        <li v-if="days > 0" class="w-16">
            <p class="text-3xl">{{ days | twoDigits }}</p>
            <p class="text-sm text-gray-300">{{ days > 1 ? 'days' : 'day' }}</p>
        </li>
        <li class="w-16">
            <p class="text-3xl">{{ hours | twoDigits }}</p>
            <p class="text-sm text-gray-300">{{ hours > 1 ? 'hours' : 'hour' }}</p>
        </li>
        <li class="w-16">
            <p class="text-3xl">{{ minutes | twoDigits }}</p>
            <p class="text-sm text-gray-300">min</p>
        </li>
        <li class="w-16">
            <p class="text-3xl">{{ seconds | twoDigits }}</p>
            <p class="text-sm text-gray-300">sec</p>
        </li>
    </ul>
   
    </div>
</template>

<script>
let interval = null;
export default {
    name: 'vuejsCountDown',
    props: {
       end: Number
    },
    data() {
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            date: null,
            diff: 0
        }
    },
    created() {
        this.date = Math.trunc(this.end / 1000);
        interval = setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000);
        }, 1000);
    },
    computed: {
        seconds() {
            return Math.trunc(this.diff) % 60
        },
        minutes() {
            return Math.trunc(this.diff / 60) % 60
        },
        hours() {
            return Math.trunc(this.diff / 60 / 60) % 24
        },
        days() {
            return Math.trunc(this.diff / 60 / 60 / 24)
        }
    },
    watch: {
        now(value) {
            this.diff = this.date - this.now;
            if(this.diff <= 0 || this.stop){
                this.diff = 0;
                // Remove interval
                clearInterval(interval);
            }
        }
    },
    filters: {
        twoDigits(value) {
            if ( value.toString().length <= 1 ) {
                return '0'+value.toString()
            }
            return value.toString()
        }
    },
    destroyed() {
        clearInterval(interval);
    }
}
</script>