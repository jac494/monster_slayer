function getRandomAttackDamage(damageMin, damageMax) {
    return Math.floor(Math.random() * (damageMax - damageMin)) + damageMin;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
        };
    },
    methods: {
        attackMonster() {
            // random attack dmg between 5 and 12, inclusive
            const attackDamage = getRandomAttackDamage(5, 12);
            this.monsterHealth -= attackDamage;
            // turn-based, so monster attacks player >:-)
            this.attackPlayer();
        },
        attackPlayer() {
            // monster hits a bit harder
            const attackDamage = getRandomAttackDamage(8, 15);
            this.playerHealth -= attackDamage;
        }
    }
});

app.mount('#game');