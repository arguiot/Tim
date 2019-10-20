---
---
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

        this.setupSearch()
    }
    menu() {
        this.menuColor()
        this.expandable()
    }
    menuColor() {
        this.menu = this.view.querySelector(".menu")
        this.article = document.querySelector("article")
        this.sup = typeof this.article !== "undefined" && this.article !== null ? window.innerHeight / 2 - 30 : window.innerHeight - 30
        this.hero = this.view.querySelector(".hero")

        addEventListener("scroll", () => {
            requestAnimationFrame(this.effectRendering.bind(this))
        })
    }

    effectRendering() {
        if (window.scrollY > this.sup) {
            this.menu.querySelectorAll(".item").forEach(el => el.style.color = "var(--opposite)")
            this.menu.querySelector(".triangle").style["border-top"] = "17.32px solid var(--opposite)"

            const expandable = this.menu.querySelector(".expandable")
            expandable.style["border-color"] = "var(--opposite)"
            expandable.style["background"] = "var(--white)"
            expandable.style["color"] = "var(--opposite)"
            expandable.querySelector(".triangle").style["border-top"] = "17.32px solid var(--opposite)"
        } else {
            this.menu.querySelectorAll(".item").forEach(el => el.style.color = "#fff")
            this.menu.querySelector(".triangle").style["border-top"] = "17.32px solid #fff"

            const expandable = this.menu.querySelector(".expandable")
            expandable.style["border-color"] = "#fff"
            expandable.style["background"] = "#111"
            expandable.style["color"] = "#fff"
            expandable.querySelector(".triangle").style["border-top"] = "17.32px solid #fff"
        }

        if (this.article) {
            const f = window.scrollY / this.sup > 1 ? 1 : window.scrollY / this.sup
            this.article.style.opacity = f
            const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1
            if (!isFirefox) {
                this.hero.style.filter = `saturate(180%) blur(${20 * f}px)`
            }
            if (f >= 1) {
                this.hero.style.display = "none"
            } else {
                this.hero.style.display = "block"
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

    /// MARK: Search
    setupSearch() {
        if (typeof this.view.querySelector("input#search") === "undefined" || this.view.querySelector("input#search") === null) {
            return
        }
        this.loadScript("https://cdn.jsdelivr.net/npm/orionsearch@0.1.1/dist/front-end.bundle.js", () => {
            const {
                OSDatabase,
                OSRecord,
                OSQuery,
            } = OrionSearch

            const db = new OSDatabase()

            fetch("{{site.url}}/articles.json").then(data => {
                return data.json()
            }).then(data => {
                db._data = data.map(x => new OSRecord(x))
                db.configure("name")
                this.os = new OrionSearch.OrionSearch(db)

                this.view.querySelector("input#search").addEventListener("input", this.search.bind(this))
            })
        })
    }
    search() {
        const {
            OSDatabase,
            OSRecord,
            OSQuery,
        } = OrionSearch

        const v = this.view.querySelector("input#search").value
        const query = new OSQuery(v)
        const list = this.view.querySelector(".list")
        list.innerHTML = ""
        let l = []
        this.os.perform(query, this.os.OSSearchType.normal, record => {
            l.push(record.data)
        })
        if (v == "") {
            l = this.os.db._data.slice(0, 20).map(r => r.data)
        }
        for (let i = 0; i < l.length / 2; i++) {
            const post = l[2 * i]
            const post2 = l[2 * i + 1]
            let add = ""
            if (typeof post2 !== "undefined") {
                add = `
                <div class="article" link="${post2.url}">
                    <img src="${post2.image}" alt="${post2.description}">
                    <p>${post2.name}</p>
                </div>
                `
            }
            list.innerHTML += `
                <div class="row">
                    <div class="article" link="${post.url}">
                        <img src="${post.image}" alt="${post.description}">
                        <p>${post.name}</p>
                    </div>
                    ${add}
                </div>
                `
        }
        this.mountGroups(
            this.view.querySelectorAll(".article"), // All groups element
            Article // The Group class
        )
    }
    loadScript(url, callback) {
        const script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState) { // only required for IE <9
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
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