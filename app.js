function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return {width: '0%'};
            }
            if (this.monsterHealth < 25) {
                return {width: this.monsterHealth + '%', backgroundColor: '#880017'}
            } else {
                return {width: this.monsterHealth + '%'};
            }
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
            return {width: '0%'};
        }
            if (this.playerHealth < 25) {
                return {width: this.playerHealth + '%', backgroundColor: '#880017'}
            } else {
                return {width: this.playerHealth + '%'};
            }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // player lost
                this.winner = 'player';
            }
        },
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackDamage = getRandomValue(5, 12);
            this.monsterHealth -= attackDamage;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackDamage = getRandomValue(8, 15);
            this.playerHealth -= attackDamage;
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackDamage = getRandomValue(10, 25);
            this.monsterHealth -= attackDamage;
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
        },
        initGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
        },
    }
});

app.mount('#game');
