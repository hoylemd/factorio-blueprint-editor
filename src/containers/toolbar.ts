import G from '../globals'

export class ToolbarContainer extends PIXI.Container {

    info: PIXI.Text
    logo: PIXI.Text
    fpsGUIText: PIXI.Text
    gridposGUIText: PIXI.Text

    constructor() {
        super()

        this.interactive = false
        this.interactiveChildren = false

        const background = new PIXI.Sprite(PIXI.Texture.WHITE)
        const width = G.app.renderer.width / G.pixelRatio
        background.width = width
        window.addEventListener('resize', () => {
            const width = G.app.renderer.width / G.pixelRatio
            background.width = width
            this.fpsGUIText.position.set(width, background.height / 2)
            this.logo.position.set(width / 2, background.height / 2)
            this.info.position.set(width - 100, background.height)
        }, false)
        background.height = 32
        background.tint = G.UIColors.primary
        this.addChild(background)

        this.gridposGUIText = new PIXI.Text('')
        this.gridposGUIText.style.fontSize = 26
        this.gridposGUIText.anchor.set(0, 0.5)
        this.gridposGUIText.position.set(0, background.height / 2)
        this.gridposGUIText.style.fill = G.UIColors.text
        this.addChild(this.gridposGUIText)

        this.fpsGUIText = new PIXI.Text('')
        this.fpsGUIText.style.fontSize = 26
        this.fpsGUIText.anchor.set(1, 0.5)
        this.fpsGUIText.style.fill = G.UIColors.text
        this.fpsGUIText.position.set(width, background.height / 2)
        this.addChild(this.fpsGUIText)

        this.logo = new PIXI.Text('Factorio Blueprint Editor')
        this.logo.style.fontSize = 30
        this.logo.anchor.set(0.5, 0.5)
        this.logo.style.fill = G.UIColors.text
        this.logo.position.set(width / 2, background.height / 2)
        this.addChild(this.logo)

        this.info = new PIXI.Text('Press I for info')
        this.info.style.fontSize = 20
        this.info.anchor.set(1, 1)
        this.info.style.fill = G.UIColors.text
        this.info.position.set(width - 100, background.height)
        this.addChild(this.info)

        G.app.ticker.add(() => this.fpsGUIText.text = String(Math.round(G.app.ticker.FPS)) + ' FPS')
    }

    updateGridPos(coords: IPoint) {
        this.gridposGUIText.text = `X ${coords.x} Y ${coords.y}`
    }
}
