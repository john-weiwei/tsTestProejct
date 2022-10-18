export class AddOrderForm {
    content!: string
    constructor() {

    }

    setContent(content: string) {
        this.content = content
    }

    getContent(): string {
        return this.content
    }
}