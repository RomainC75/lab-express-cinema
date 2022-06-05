
const body = document.querySelector('tbody')

const displayDetails = async (id) =>{
    try{
        const {data} = await axios.get(`http://localhost:3000/movies/${id}`)
        const detailParent = document.querySelector(`td[data='${id}']`)
        console.log('------',detailParent)
        console.log('data -> ',data)
        
        //fill the stars List !
        const starUl = detailParent.querySelector('.starsList')
        data[0].stars.forEach(star=>{
            const starLi = document.createElement('li')
            starLi.textContent = star
            starUl.appendChild(starLi)
        })
        
        //fill the description 
        const descriptionP = detailParent.querySelector('.description')
        descriptionP.textContent=data[0].description

        //fill the showTime list ! 
        const showUl = detailParent.querySelector('.showTimeList')
        data[0].showtimes.forEach(show=>{
            const showLi = document.createElement('li')
            showLi.textContent = show
            showUl.appendChild(showLi)
        })
        detailParent.querySelector('.spinner').style.display='none'
        detailParent.querySelector('.toShowAfterFetching').style.display="block"
        return true
    }catch(e){
        return false
    }
    
}

const getMovies = async () =>{
    const {data} = await axios.get("http://localhost:3000/movies")
    console.log(data)
    data.forEach( movie=>{
        const tr = document.createElement('tr')
        
        tr.innerHTML=`
            <tr>
                <td>${movie.title}</td>
                <td>${movie.director}</td>
                <td>
                <img
                    class="movieBanner"
                    src="${movie.image}"
                />
                </td>
                <td class="detailsParent">                  
                    <svg
                        class="detailsIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192 512"
                    >
                        <!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                        <path
                        d="M160 448h-32V224c0-17.69-14.33-32-32-32L32 192c-17.67 0-32 14.31-32 32s14.33 31.1 32 31.1h32v192H32c-17.67 0-32 14.31-32 32s14.33 32 32 32h128c17.67 0 32-14.31 32-32S177.7 448 160 448zM96 128c26.51 0 48-21.49 48-48S122.5 32.01 96 32.01s-48 21.49-48 48S69.49 128 96 128z"
                        />
                    
                    </svg>
                    <div class="details">
                        <div class="spinner"></div>
                        <div class="toShowAfterFetching">
                            <h2>Details</h2>
                            <p class="details__type"></p>
                            <ul class="starsList">
                            </ul>
                            <p class="details__type">Description</p>
                            <p class="description"></p>
                            <p class="details__type"> showTimes </p>
                            <ul class="showTimeList">  
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        `
        body.appendChild(tr)
        const detailsParent = tr.querySelector('.detailsParent')
        console.log('detailsParent',detailsParent)
        detailsParent.setAttribute('data',movie._id)
        
        detailsParent.addEventListener('mouseenter', async()=>{
            console.log('is downloaded : ', detailsParent.getAttribute('downloaded'))

            if( detailsParent.getAttribute('downloaded')==null ){
                console.log('try to display')
                const displayed = await displayDetails(movie._id)
                displayed && detailsParent.setAttribute('downloaded','true')
            }
            
            
        })
    })
}

getMovies()





