const P = new ProType()

// View Controllers
class Landing extends P.ViewController {
    preload() {
        this.state = {
            expand: false
        }
    }
    willShow() {
        this.menu()
        this.mountGroups(
            this.view.querySelectorAll(".article"), // All groups element
            Article // The Group class
        )
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
                document.querySelector(".expand > .triangle").style.transform = "rotate(180deg)"
            } else {
                menu.style.display = "none"
                document.querySelector(".expand > .triangle").style.transform = "rotate(0deg)"
            }
        })
    }
}


// Groups
class Article extends P.Group {
    init() {
        this.group.addEventListener("click", e => {
            const url = this.group.getAttribute("link")
            window.location = url
        })
    }
}

P.mount([
    "Landing",
    document.body,
    Landing
])

P.set("Landing")