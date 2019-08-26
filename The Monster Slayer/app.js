new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        turns: []
    },
    methods:{
        startGame: function (){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameRunning = true;
            this.turns = [];
        },
        attack: function (){
            var damage = this.calculateDamage(1,10);
            this.monsterHealth -= damage;
            this.turns.unshift({isPlayer: true, text: 'Player hits Monster for ' + damage});
            if(this.checkWin())
                return;
            
            this.monsterAttacks();
        },
        specialAttack: function (){
            var damage = this.calculateDamage(10,20);
            this.monsterHealth -= damage;
            this.turns.unshift({isPlayer: true, text: 'Player hits Monster for ' + damage});
            if(this.checkWin())
                return;
            
            this.monsterAttacks();
        },
        heal: function (){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
                this.turns.unshift({isPlayer: true, text: 'Player  heals for 10'});
            }
            else
            {
                this.turns.unshift({isPlayer: true, text: 'Player  heals for ' + (100-this.playerHealth)});
                this.playerHealth = 100;
            }

            this.monsterAttacks();
        },
        giveUp: function (){
            this.gameRunning = false;
        },
        calculateDamage: function(min,max){
            return Math.max( Math.floor(Math.random()*max) + 1, min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0)
            {
                if(confirm('you won! new game?'))
                    this.startGame();
                else
                    this.gameRunning = false;
                return true;
            }
            if(this.playerHealth <= 0)
            {
                if(confirm('you lost! new game?'))
                    this.startGame();
                else
                    this.gameRunning = false;
                return true;
            }
            return false;
        },
        monsterAttacks: function (){
            var damage = this.calculateDamage(3,12);;
            this.playerHealth -= damage;
            this.turns.unshift({isPlayer: false, text: 'Monster  hits Player for ' + damage});
            this.checkWin();
        }

    }
});