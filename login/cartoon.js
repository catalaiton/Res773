const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const antena = document.getElementById('antena');
const body = document.querySelector('body');


const emailImage = [
    {range :[0,1], src: 'imagenes/ant1.png'},
    {range :[1,2], src: 'imagenes/ant2.png'},
    {range :[2,3], src: 'imagenes/ant3.png'},   
    {range :[3,4], src: 'imagenes/ant4.png'},
    {range :[4,5], src: 'imagenes/ant5.png'},
    {range :[5,6], src: 'imagenes/ant6.png'},
    {range :[6,7], src: 'imagenes/ant7.png'},
    {range :[7,8], src: 'imagenes/ant8.png'},
    {range :[8,9], src: 'imagenes/ant9.png'},
    {range :[9,10], src: 'imagenes/ant10.png'},
    {range :[10,11], src: 'imagenes/ant11.png'},
    {range :[11,12], src: 'imagenes/ant12.png'},
    {range :[12,13], src: 'imagenes/ant13.png'},
    {range :[13,14], src: 'imagenes/ant14.png'},
    {range :[14,15], src: 'imagenes/ant15.png'},
    {range :[15,16], src: 'imagenes/ant16.png'},
    {range :[16,17], src: 'imagenes/ant17.png'},
    {range :[17,18], src: 'imagenes/ant18.png'},
    {range :[18,19], src: 'imagenes/ant19.png'},
    {range :[19,20], src: 'imagenes/ant20.png'},
    {range :[20,21], src: 'imagenes/ant21.png'},
    {range :[21,22], src: 'imagenes/ant22.png'},
    {range :[22,23], src: 'imagenes/ant23.png'},
    {range :[23,24], src: 'imagenes/ant24.png'},
    {range :[24,25], src: 'imagenes/ant25.png'}
  
    
]


emailInput.addEventListener('keyup', (Event) => {
    const userValue = emailInput.value.length;
    const image = emailImage.find(({range}) =>
    userValue >= range[0] && userValue <= range[1]
);


    if (image)
    {
        antena.src = image.src;
    }
}); 

emailInput.addEventListener("focus", (Event) =>{
    antena.src = emailImage[0].src;

});

passwordInput.addEventListener("focus", (Event) =>{
     let cont =1;
      //aux =p;
     const hide =setInterval (()=>{
        antena.src = `imagenes/pass/ant${cont}.png`;
        if(cont <18)
        {
            return cont++;
        }
        clearInterval (hide);
     },60)
    
})

/*
if (aux== p)
{
    let cont =18;
    
   const hide =setInterval (()=>{
      antena.src = `imagenes/pass/ant${cont}.png`;
      if(cont >1 )
      {
          return cont--;
      }
      clearInterval (hide);
   },60)
    aux =a;
}*/
