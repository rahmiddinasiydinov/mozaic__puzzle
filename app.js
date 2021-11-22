let pictures = document.querySelectorAll('.picture__wrapper');
let reset = document.querySelector('.reset');
let puzzleWrap = document.querySelector('.puzzle');
let modal = document.querySelector('.modal');
let winSteps = document.querySelector('.modal__steps');
let modalExit = document.querySelector('.modal__exit');

modalExit.addEventListener('click', ()=>{
  modal.classList.remove('active');
});

let puzzlePictures = {
    0:'./images/image_part_001.jpg',
    1:'./images/image_part_002.jpg',
    2:'./images/image_part_003.jpg',
    3:'./images/image_part_004.jpg',
    4:'./images/image_part_005.jpg',
    5:'./images/image_part_006.jpg',
    6:'./images/image_part_007.jpg',
    7:'./images/image_part_008.jpg',
    8:'./images/image_part_009.jpg',
}

let chosen2 = []
let count = 0;
let mixed = [];
let steps = 0;
let ideal = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let pictureArr = [...pictures]
console.log(pictureArr);
pictureArr.forEach(e=>{
    e.dataset.id = count++;
})


reset.addEventListener('click', ()=> {
    mixed = [];
   steps = 0;
  while(mixed.length<9){
      let x = Math.floor(Math.random()*9);
      if(!mixed.includes(x)){
          mixed = [...mixed, x];
      }
  }
  console.log(mixed);
  render(mixed)

})


 function render(mixed){
  puzzleWrap.innerHTML =null 
  mixed.map(e=>{
    let newImg = document.createElement('img');
    newImg.setAttribute('class', 'picture');
    newImg.src = `${puzzlePictures[e]}`;
    newImg.dataset.id = e;
    if(mixed.join('') !== ideal.join('')){
    
      newImg.addEventListener('click', ()=>{
        chosen2.push(e);
        newImg.classList.add('chosen')
        console.log(chosen2);
        if(chosen2.length ===2){
          let a = chosen2[0];
          let b = chosen2[1];
          let indexa = mixed.findIndex(e => e===a )
          let indexb = mixed.findIndex(e=> e===b)
          mixed[indexa] = b;
          mixed[indexb] = a;
          steps++;
          render(mixed);
          chosen2 = [];
          console.log(mixed.join('') === ideal.join(''))
          if(mixed.join('') === ideal.join('')){
            modal.classList.add('active');
            winSteps.textContent = `You have used ${steps} steps to complete!`
          }  
        }
      })
    }
      puzzleWrap.appendChild(newImg);
})

 }