const P = new ProType()

class Landing extends P.ViewController {
    preload() {
        this.state = {
            expand: false
        }
    }
    willShow() {
        this.menu()
    }
    menu() {
        this.menuColor()
        this.expandable()
    }
    menuColor() {
        const menu = this.view.querySelector(".menu")
        window.onscroll = () => {
            if (window.scrollY > window.innerHeight - 30) {
                menu.querySelectorAll(".item").forEach(el => el.style.color = "#111")
                menu.querySelector(".triangle").style["border-top"] = "17.32px solid #111"

                const expandable = menu.querySelector(".expandable")
                expandable.style["border-color"] = "#111"
                expandable.style["background"] = "#fff"
                expandable.style["color"] = "#111"
                expandable.querySelector(".triangle").style["border-top"] = "17.32px solid #111"
            } else {
                menu.querySelectorAll(".item").forEach(el => el.style.color = "#fff")
                menu.querySelector(".triangle").style["border-top"] = "17.32px solid #fff"

                const expandable = menu.querySelector(".expandable")
                expandable.style["border-color"] = "#fff"
                expandable.style["background"] = "#111"
                expandable.style["color"] = "#fff"
                expandable.querySelector(".triangle").style["border-top"] = "17.32px solid #fff"
            }
        }
    }
    expandable() {
        const menu = this.view.querySelector(".expand")
        menu.addEventListener("click", e => {
            this.state = {
                expand: !this.state.expand
            }
            const menu = this.view.querySelector(".expandable")
            if (this.state.expand === true) {
                menu.style.display = "block"
            } else {
                menu.style.display = "none"
            }
        })
    }
}

P.mount([
    "Landing",
    document.body,
    Landing
])

P.set("Landing")