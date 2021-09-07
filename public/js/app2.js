const img = document.querySelector(".portrait")
console.log(img)

let i = 0
setInterval(() => {
    const images = ['/img/sidd2.jpeg', '/img/sidd3.jpeg', '/img/sidd4.jpeg', '/img/sidd5.jpeg', '/img/sidd6.jpeg', '/img/sidd.jpeg']
    img.src = images[i]
    i++;
    if(i>= images.length)
        i=0
}, 1500);