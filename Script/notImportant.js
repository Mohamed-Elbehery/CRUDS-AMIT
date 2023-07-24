// // !
// let i = 0;
// with({
//     get a(){
//         return ++i;
//     }
// })

// // 2
// let i = 0;

// const a = {
//     toString: () => ++i;
// }

// // 3
// function Value() {
//     let value = 0;
//     this.toString = () => ++value;
// }

// let a = new Value();

// // 4
// class Value {
//     constructor(){
//         this.value = 1;
//         this.toString = () => this.value++;
//     }
// }

// let a = new Value();

// // 5
// let values = [3,2,1];
// const a = {
//   toString: function () {
//     return values.shift();
//   }
// }

// if(a == 1 && a == 2 && a == 3) console.log('True');
