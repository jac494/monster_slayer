function getRandomAttackDamage(damageMin, damageMax) {
    return Math.floor(Math.random() * (damageMax - damageMin)) + damageMin;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
        };
    },
    computed: {
        monsterBarStyles() {
            return {width: this.monsterHealth + '%'};
        },
        playerBarStyles() {
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
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
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackDamage = getRandomAttackDamage(10, 25);
            this.monsterHealth -= attackDamage;
            this.attackPlayer();
        },
    }
});

app.mount('#game');
