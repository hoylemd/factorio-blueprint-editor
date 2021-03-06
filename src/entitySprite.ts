import G from './globals'
import { AdjustmentFilter } from '@pixi/filter-adjustment'

export class EntitySprite extends PIXI.Sprite {
    static nextID = 0

    id: number
    isMoving: boolean
    shift: IPoint
    zIndex: number
    zOrder: number

    constructor(data: any) {
        if (!data.shift) data.shift = [0, 0]
        if (!data.x) data.x = 0
        if (!data.y) data.y = 0
        if (!data.divW) data.divW = 1
        if (!data.divH) data.divH = 1

        const spriteData = PIXI.utils.TextureCache[data.filename]
        // TODO: Cache the texture
        super(new PIXI.Texture(spriteData.baseTexture, new PIXI.Rectangle(
            spriteData.frame.x + data.x,
            spriteData.frame.y + data.y,
            data.width / data.divW,
            data.height / data.divH
        )))

        this.interactive = false
        this.id = EntitySprite.nextID++
        this.isMoving = false

        this.shift = {
            x: data.shift[0] * 32,
            y: data.shift[1] * 32
        }

        this.position.set(this.shift.x, this.shift.y)

        if (data.scale) this.scale.set(data.scale, data.scale)
        this.anchor.set(0.5, 0.5)

        if (data.flipX) this.scale.x *= -1
        if (data.flipY) this.scale.y *= -1

        if (data.height_divider) this.height /= data.height_divider

        if (data.rot) this.rotation = data.rot * Math.PI * 0.5

        if (data.color) {
            this.filters = [new AdjustmentFilter({
                gamma: 1.4,
                contrast: 1.4,
                brightness: 1.2,
                red: data.color.r,
                green: data.color.g,
                blue: data.color.b,
                alpha: data.color.a
            })]
        }

        return this
    }

    set moving(moving: boolean) {
        this.isMoving = moving
        if (moving) {
            if (this.filters !== null) this.filters.push(G.BPC.movingEntityFilter)
            else this.filters = [G.BPC.movingEntityFilter]
        } else {
            // tslint:disable-next-line:no-null-keyword
            if (this.filters.length === 1) this.filters = null
            else this.filters.pop()
        }
    }

    setPosition(position: PIXI.Point | PIXI.ObservablePoint) {
        this.position.set(
            position.x + this.shift.x,
            position.y + this.shift.y
        )
    }
}
