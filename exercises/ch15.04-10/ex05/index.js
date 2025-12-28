customElements.define("inline-circle", class InlineCircle extends HTMLElement {
    connectedCallback() {
        // 円の作成に必要なスタイルを設定する。
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        // 以下のようにボーダーを決めてしまうと、属性で変更できなくなる。
        // this.style.border = "solid black 1px";
        //なのでスタイルや太さだけを決め、色は属性で変更できるようにする
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.transform = "translateY(10%)";
        
        if (!this.style.width) {
            this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
    }

    //これはブラウザが見に行くメソッド。observedAttributesがあることで属性の変更をキャッチできる
    // ⇒attributeChangedCallback() メソッドが呼び出される。
    static get observedAttributes() { return ["diameter", "color", "border-color"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "diameter":
                // diameter 属性が変更された場合、大きさを更新する。
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case "color":
                // color 属性が変更された場合、色を変更する。
                this.style.backgroundColor = newValue;
                break;
            case "border-color":
                // border-color 属性が変更された場合、枠線の色を変更する。
                this.style.borderColor = newValue;
                break;
        }
    }
    // 要素の属性に対応するJavaScript プロパティを定義する。ここで
    // 定義したゲッターとセッターは、属性を読み出したり設定したり
    // するだけ。JavaScript のプロパティが設定されると、属性が設定
    // される。そして、attributeChangedCallback() が呼び出され、
    // 要素のスタイルが更新される。
    get diameter() { return this.getAttribute("diameter"); }
    set diameter(diameter) { this.setAttribute("diameter", diameter); }
    get color() { return this.getAttribute("color"); }
    set color(color) { this.setAttribute("color", color); }
    get borderColor() { return this.getAttribute("border-color"); }
    set borderColor(borderColor) { this.setAttribute("border-color", borderColor); }
});