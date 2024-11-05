
export const otherWordsForHome = require("../assets/images/other_words_for_home.jpg");
export const theMetropolist = require("../assets/images/the_metropolist.jpg");
export const theTinyDragon = require("../assets/images/the_tiny_dragon.jpg");
export const underland = require("../assets/images/underland.jpg");
export const sea=require("../assets/images/sea.jpg");
export const height=require("../assets/images/height.jpg");
export const operating=require("../assets/images/operating.jpg");
export const oop=require("../assets/images/oop.jpg");
export const LA=require("../assets/images/LA.jpg");
export const AI=require("../assets/images/AI.jpg");
export const urdu1=require("../assets/images/urdu1.jpg");
export const urdu2=require("../assets/images/urdu2.jpg");
export const urdu3=require("../assets/images/urdu3.jpg");
export const ora=require("../assets/images/ora.jpg");
export const eng1=require("../assets/images/eng1.jpg");
export const eng2=require("../assets/images/eng2.jpg");
export const bio1=require("../assets/images/bio1.jpg");
export const bio2=require("../assets/images/bio2.jpg");
export const p1=require("../assets/images/p1.jpg");
export const p2=require("../assets/images/p2.jpg");
export const p3=require("../assets/images/p3.jpg");
export const cmp=require("../assets/images/cmp.jpg");
export const comp=require("../assets/images/comp.jpg");
export const chem=require("../assets/images/chem.jpg");
export const resetPass=require("../assets/images/reset.png");
export const order=require("../assets/images/order.png");
export const code=require("../assets/images/code.png");
export const feedback=require("../assets/images/feedback.jpg");
export const reenter=require("../assets/images/reenter.png");
export default {
    chem,
    reenter,
    comp,
    eng1,
    eng2,
    bio1,
    bio2,
    otherWordsForHome,
    theMetropolist,
    theTinyDragon,
    underland,
    sea,
    height,
    operating,
    oop,
    LA,
    AI,
    urdu1,
    urdu2,
    urdu3,
    ora,
    p1,
    p2,
    p3,
    resetPass,
   cmp,
   order,
   feedback,
   code
    
}
// instead of adding images in home.js directly we have to create a image.js file in order to aviod mess
//firstly we export it from assets and images folder
// with the help of require we define the path
// then in export default we simply export the name of images 