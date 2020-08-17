class GS extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    connectedCallback(){
        this.shadow.innerHTML = `<style>
            #GS {
                max-width: 100%;
                border-radius: 50px;
                box-shadow: 1px 2px 3px #23232360;
                background: linear-gradient(90deg, #232323, #255127);
                transition: 400ms ease-in;
                border: 2px solid #255127;
                font-size: 1.2rem;
                text-shadow: 1px 1px 3px #23232330;
                text-align: center;
                letter-spacing: 1px;
                margin: 10px;
                padding: 8px 11px;
                color: white;
                cursor: pointer;
            }
            #GS:hover {
                border: 1px solid #bc8224;
                letter-spacing: 3px;
                color: #bc8224;
                transition: 250ms ease-out;
            }
        </style>
        <div id="GS">Get A Quote</div>`
        this.shadow.querySelector('#GS').addEventListener('click', () => {
            getStarted()
            follow({page: '/', event: 'click', target: 'get-started'})
        })
    }
}
customElements.define('get-started', GS)
class iCard extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    render(){
        this.shadow.innerHTML = `<style>
            #cont {
                width: 100%;
                max-width: 100%;
                overflow: hidden;
                margin: 0px;
                padding: 0px;
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            img {
                max-width: 100%;
                border-radius: 5px;
                box-shadow: 1px 1px 4px #00000040;
            }
            h1 {
                padding: 10px;
            }
            p {
                padding: 15px;
            }
        </style>
        <div id="cont">
            <img alt="Roofing Photo ${Math.round(Math.random() * 1000)}" src="${this.getAttribute(['image'])}">
            <h1>${this.getAttribute(['head'])}</h1>
            <p>${this.getAttribute(['sub'])}</p>
            <get-started></get-started>
        </div>`
    }
    connectedCallback(){
        this.render()
    }
    static get observedAttributes(){
        return ['head', 'sub', 'image']
    }
    attributeChangedCallback(name, o, n){
        if (['head', 'sub', 'image'].includes(name)) this.render()
    }
}
customElements.define('img-card', iCard)
class Stars extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    stars(e) {
        Array.from(this.shadow.querySelectorAll('.star')).forEach((star, index) => {
            if (index <= e) star.classList.add('active')
        })
    }
    render(){
        this.shadow.innerHTML = `<style>
            #cont {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr;
                max-width: 100%;
                overflow: hidden;
                margin: 0;
                padding: 0;
                width: 100%;
                max-height: 75px;
            }
            .star {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                max-width: 100%;
                width: 100%;
                padding: 3px;
            }
            .active .cls-1 {
                fill: yellow;
            }
            @media screen and (max-width: 1280px) {
                svg {
                    height: auto;
                    width: 80%;
                    max-width: 80%;
                }
            }
            @media sreen and (min-width: 1280px) {
                #cont {
                    max-width: 50%;
                }
                svg {
                    max-height: 100%;
                    height: 80px;
                }
            }
        </style>
        <div id="cont">
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.53 133.65">
                    <defs>
                        <style>
                        .cls-1 {
                            fill: #fff;
                            stroke: #262424;
                            stroke-miterlimit: 10;
                            stroke-width: 0.96px;
                        }
                        </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                        <polygon class="cls-1" points="70.27 1.56 86.5 51.53 139.05 51.53 96.54 82.42 112.78 132.4 70.27 101.51 27.75 132.4 43.99 82.42 1.48 51.53 54.03 51.53 70.27 1.56"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.53 133.65">
                    <defs>
                        <style>
                        .cls-1 {
                            fill: #fff;
                            stroke: #262424;
                            stroke-miterlimit: 10;
                            stroke-width: 0.96px;
                        }
                        </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                        <polygon class="cls-1" points="70.27 1.56 86.5 51.53 139.05 51.53 96.54 82.42 112.78 132.4 70.27 101.51 27.75 132.4 43.99 82.42 1.48 51.53 54.03 51.53 70.27 1.56"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.53 133.65">
                    <defs>
                        <style>
                        .cls-1 {
                            fill: #fff;
                            stroke: #262424;
                            stroke-miterlimit: 10;
                            stroke-width: 0.96px;
                        }
                        </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                        <polygon class="cls-1" points="70.27 1.56 86.5 51.53 139.05 51.53 96.54 82.42 112.78 132.4 70.27 101.51 27.75 132.4 43.99 82.42 1.48 51.53 54.03 51.53 70.27 1.56"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.53 133.65">
                    <defs>
                        <style>
                        .cls-1 {
                            fill: #fff;
                            stroke: #262424;
                            stroke-miterlimit: 10;
                            stroke-width: 0.96px;
                        }
                        </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                        <polygon class="cls-1" points="70.27 1.56 86.5 51.53 139.05 51.53 96.54 82.42 112.78 132.4 70.27 101.51 27.75 132.4 43.99 82.42 1.48 51.53 54.03 51.53 70.27 1.56"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div class="star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140.53 133.65">
                    <defs>
                        <style>
                        .cls-1 {
                            fill: #fff;
                            stroke: #262424;
                            stroke-miterlimit: 10;
                            stroke-width: 0.96px;
                        }
                        </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                        <polygon class="cls-1" points="70.27 1.56 86.5 51.53 139.05 51.53 96.54 82.42 112.78 132.4 70.27 101.51 27.75 132.4 43.99 82.42 1.48 51.53 54.03 51.53 70.27 1.56"/>
                        </g>
                    </g>
                </svg>
            </div>
        </div>`
        this.stars(this.getAttribute(['stars']))
    }
    connectedCallback(){
        this.render()
    }
    static get observedAttributes(){
        return ['stars']
    }
    attributeChangedCallback(name, o, n){
        if (name === 'stars') this.render()
    }
}
customElements.define('star-bar', Stars)
class RC extends HTMLElement {
    constructor(){
        super()
        this.shadow = this.attachShadow({mode:'open'})
    }
    render(){
        this.shadow.innerHTML = `<style>
            #cont {
                max-width: 100%;
                width: 100%;
                margin: 0;
                padding: 0;
                border: 2px grey solid;
                border-right: none;
                border-left: none;
                display: inline-flex;
                align-items: center;
                justify-content: space-around;
            }
            .b1 {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                max-width: 33%;
                padding: 5px;
            }
            h3 {
                margin: 0;
                padding: 8px;
            }
            .review {
                max-width: 66%;
            }
            #pic {
                max-width: 100%;
                width: 100%;
                max-height: 75px;
            }
        </style>
        <div id="cont">
            <div class="b1">
                <div id="pic"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1019.23 1019.23">
                <defs>
                  <style>
                    .cls-1 {
                      fill: #4eaa55;
                    }
              
                    .cls-2 {
                      fill: #fff;
                    }
                  </style>
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <circle class="cls-1" cx="509.62" cy="509.62" r="509.62"/>
                    <path class="cls-2" d="M388.09,955.4l2-480c-5.81-86.95,65.4-151.36,130.72-145,53.56,5.2,103.27,58,106.21,126.64q2.06,247.15,4.09,494.3Z"/>
                    <circle class="cls-2" cx="509.62" cy="185.36" r="121.53"/>
                  </g>
                </g>
              </svg></div>
                <h3>${this.getAttribute(['name'])}</h3>
                <star-bar stars="${this.getAttribute(['stars'])}"></star-bar>
            </div>
            <p class="review">${this.getAttribute(['body'])}</p>
        </div>`
        if (this.hasAttribute('image')) {
            this.shadow.querySelector('#pic').innerHTML = `<img src="${this.getAttribute(['image'])}" style="max-width: 100%; border-radius: 100px;`
        }
    }
    connectedCallback(){
        this.render()
    }
    static get observedAttributes(){
        return ['name', 'image', 'stars', 'body']
    }
    attributeChangedCallback(name, o, n){
        if (['name', 'image', 'stars', 'body'].includes(name)) this.render()
    }
}
customElements.define('review-card', RC)