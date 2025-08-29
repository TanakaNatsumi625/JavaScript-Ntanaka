//動物の振る舞いを能力として実装する
class Ability {
    eat(){
        console.log("食べます")
    }
    bite(){
        console.log("噛みます")
    }
    scratch(){
        console.log("引っ掻きます")
    }
    fly(){
        console.log("飛びます")
    }
    swim(){
        console.log("泳ぎます")
    }
    makeSound(){
        console.log("鳴きます")
    }

}

//それぞれの動物のクラスでAbilityクラスを利用する
class Dog {
    constructor(name){
        this.name = name
        this.ability = new Ability()
    }
    eat(){
        this.ability.eat()
    }
    bite(){
        this.ability.bite()
    }
    scratch(){
        this.ability.scratch()
    }
    makeSound(){
        console.log("ワンワン")
    }
}
class Cat {
    constructor(name){
        this.name = name
        this.ability = new Ability()
    }
    eat(){
        this.ability.eat()
    }
    bite(){
        this.ability.bite()
    }
    scratch(){
        this.ability.scratch()
    }
    makeSound(){
        console.log("ニャーニャー")
    }
}

class Bird {
    constructor(name){
        this.name = name
        this.ability = new Ability()
    }
    eat(){
        this.ability.eat()
    }
    fly(){
        this.ability.fly()
    }
    makeSound(){
        console.log("ピヨピヨ")
    }
}
class Fish {
    constructor(name){
        this.name = name
        this.ability = new Ability()
    }
    eat(){
        this.ability.eat()
    }
    swim(){
        this.ability.swim()
    }
}